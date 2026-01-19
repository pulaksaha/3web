
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const tmdbKey = process.env.VITE_TMDB_API_KEY;

if (!supabaseUrl || !supabaseKey || !tmdbKey) {
    console.error('ERROR: Missing environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchTrendingMovies() {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${tmdbKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
}

async function fetchMovieVideos(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${tmdbKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
}

async function seed() {
    console.log('Authenticating...');
    const email = 'video@seed.com';
    const password = '123456789';

    let session = null;

    // Try to sign in
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (signInData.session) {
        session = signInData.session;
        console.log('Signed in successfully.');
    } else {
        console.log('Sign in failed or user not found. Attempting to sign up...');
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) {
            console.error('Authentication failed:', signUpError.message);
            // Fallback: Continue as anon? No, RLS will block.
            console.error('Cannot proceed with seeding.');
            return;
        }

        session = signUpData.session;
        if (!session) {
            console.warn('⚠️ User created but no session returned. Email confirmation might be enabled.');
            console.warn('   The script will try to insert as ANONYMOUS, which might fail if RLS blocks it.');
            console.warn('   FIX: Go to Supabase Auth -> Settings -> Disable "Confirm email" and try again.');
        } else {
            console.log('Signed up successfully.');
        }
    }

    console.log('Fetching trending movies from TMDB...');
    const movies = await fetchTrendingMovies();
    console.log(`Found ${movies.length} trending movies.`);

    for (const movie of movies) {
        if (!movie.backdrop_path && !movie.poster_path) continue;

        console.log(`Processing: ${movie.title}`);
        const videos = await fetchMovieVideos(movie.id);
        const trailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer') ||
            videos.find(v => v.site === 'YouTube');

        if (!trailer) {
            console.log(`No trailer found for ${movie.title}, skipping.`);
            continue;
        }

        const videoUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
        const thumbnailUrl = `https://image.tmdb.org/t/p/w780${movie.backdrop_path || movie.poster_path}`;

        const { error } = await supabase.from('videos').insert({
            title: movie.title,
            description: movie.overview,
            video_url: videoUrl,
            thumbnail_url: thumbnailUrl,
            category: 'entertainment',
            author: 'TMDB',
            published_at: new Date(movie.release_date || Date.now()).toISOString(),
            is_featured: movie.vote_average > 7.5
        });

        if (error) {
            console.error(`Failed to insert ${movie.title}:`, error.message);
        } else {
            console.log(`Inserted: ${movie.title}`);
        }
    }

    console.log('Seeding complete!');
}

seed().catch(console.error);
