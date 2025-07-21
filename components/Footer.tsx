'use client'

import Link from 'next/link'
import { Instagram, Twitter, Youtube, Music } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Spotify',
      icon: Music, // Use Music icon as a placeholder for Spotify
      url: 'https://open.spotify.com/artist/southwave',
    },
    {
      name: 'Apple Music',
      icon: Music,
      url: 'https://music.apple.com/artist/southwave',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/southwavemusic',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/southwavemusic',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/southwave',
    },
  ]

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              SOUTHWAVE
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Electronic music producer creating atmospheric soundscapes that blend deep house, ambient, and progressive elements.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={link.name}
                >
                  <link.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/music" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Music
                </Link>
              </li>
              <li>
                <Link href="/concerts" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Concerts
                </Link>
              </li>
              <li>
                <Link href="/merch" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Merchandise
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Connected</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get updates on new releases and tour dates
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-primary-400 text-sm"
              />
              <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Southwave. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}