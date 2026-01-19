import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  news: ['Movies', 'Series', 'Gaming', 'Music', 'Sports', 'Tech'],
  company: ['About VPLAZA', 'Contact', 'Careers', 'Advertise'],
  legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground mt-12">
      <div className="container py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-headline text-3xl font-bold mb-4 tracking-tighter text-primary">VPLAZA</h3>
            <p className="text-sm opacity-80 mb-4">
              Your premium destination for the latest in multimedia entertainment.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Browse Links */}
          <div>
            <h4 className="font-semibold mb-4">Browse</h4>
            <ul className="space-y-2">
              {footerLinks.news.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm opacity-80 mb-3">
              Get the latest trailers and releases delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary-foreground/50"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:bg-primary/90 transition-colors">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20" />

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} VPLAZA. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm opacity-60 hover:opacity-100 transition-opacity"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;