import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="border-b border-white/10 py-12 sm:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">Stay Updated on Impact</h3>
            <p className="text-white/70 mb-6">Get news about campaigns and success stories directly to your inbox.</p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input 
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary/50"
              />
              <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center font-bold text-white group-hover:shadow-lg transition-all">
                  D
                </div>
                <span className="font-bold text-lg">DonateBridge</span>
              </Link>
              <p className="text-sm text-white/60 leading-relaxed">
                Connecting compassionate donors with verified campaigns creating real impact in communities worldwide.
              </p>
            </div>

            {/* Explore */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Explore</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/campaigns" className="text-white/70 hover:text-primary transition-colors">
                    Browse Campaigns
                  </Link>
                </li>
                <li>
                  <Link href="/donate-money" className="text-white/70 hover:text-primary transition-colors">
                    Donate Money
                  </Link>
                </li>
                <li>
                  <Link href="/donate-items" className="text-white/70 hover:text-primary transition-colors">
                    Donate Items
                  </Link>
                </li>
                <li>
                  <Link href="/fundraiser" className="text-white/70 hover:text-primary transition-colors">
                    Start Fundraiser
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-white/70 hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-primary transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/70 hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/privacy" className="text-white/70 hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white/70 hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-primary transition-colors">
                    Trust & Safety
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-primary transition-colors">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="mailto:support@donatebridge.com" className="text-white/70 hover:text-primary transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Support
                  </a>
                </li>
                <li>
                  <Link href="/faq" className="text-white/70 hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-sm text-white/60">© 2025 DonateBridge. All rights reserved. | Trusted by 45,000+ donors</p>
            <div className="flex gap-4">
              <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-primary" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-primary" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-primary" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
