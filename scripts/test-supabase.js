
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Testing Supabase Connection...');
console.log('URL:', supabaseUrl);
console.log('Key (first 10 chars):', supabaseKey ? supabaseKey.substring(0, 10) + '...' : 'MISSING');

if (!supabaseUrl || !supabaseKey) {
    console.error('ERROR: Missing environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        console.log('Attempting to fetch videos...');
        const { data, error } = await supabase.from('videos').select('*').limit(1);

        if (error) {
            console.error('ALARM: Supabase Error:', error.message);
            console.error('Details:', error);
            if (error.code === '42P01') {
                console.error('\n--> HINT: The "videos" table does not exist. Did you run the "supabase_schema.sql" script?');
            }
        } else {
            console.log('SUCCESS: Connection successful!');
            console.log('Data retrieved:', data);
            if (data.length === 0) {
                console.log('--> Note: Table exists but is empty.');
            }
        }
    } catch (err) {
        console.error('UNEXPECTED ERROR:', err);
    }
}

testConnection();
