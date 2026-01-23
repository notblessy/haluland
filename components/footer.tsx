import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Music,
  Film,
  Tv,
  Award,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAFAFA] text-[#1a1a1a] border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="h-10 w-10 border border-gray-300 bg-[#FAFAFA] flex items-center justify-center hover:border-[#2a2a2a]/40 transition-all duration-200 overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Haluland Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-lg font-bold uppercase tracking-wider group-hover:text-[#1a1a1a]/70 transition-colors">
                HALULAND
              </span>
            </Link>
            <p className="text-xs text-[#1a1a1a]/60 leading-relaxed">
              Your ultimate destination for music and movie entertainment news,
              bringing you the latest in showbiz from around the world.
            </p>
            <div className="flex space-x-2">
              <Link
                href="#"
                className="w-8 h-8 bg-[#FAFAFA] text-[#1a1a1a] border border-gray-300 hover:border-[#2a2a2a]/40 transition-colors flex items-center justify-center"
              >
                <Facebook size={14} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-[#FAFAFA] text-[#1a1a1a] border border-gray-300 hover:border-[#2a2a2a]/40 transition-colors flex items-center justify-center"
              >
                <Twitter size={14} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-[#FAFAFA] text-[#1a1a1a] border border-gray-300 hover:border-[#2a2a2a]/40 transition-colors flex items-center justify-center"
              >
                <Instagram size={14} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-[#FAFAFA] text-[#1a1a1a] border border-gray-300 hover:border-[#2a2a2a]/40 transition-colors flex items-center justify-center"
              >
                <Youtube size={14} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider border-b border-gray-200 pb-2 text-[#1a1a1a]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-xs text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-xs text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=music"
                  className="text-xs text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors flex items-center"
                >
                  <Music className="h-3 w-3 mr-2" />
                  <span>Music</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=movies"
                  className="text-xs text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors flex items-center"
                >
                  <Film className="h-3 w-3 mr-2" />
                  <span>Movies</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=tv-shows"
                  className="text-xs text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors flex items-center"
                >
                  <Tv className="h-3 w-3 mr-2" />
                  <span>TV Shows</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=awards"
                  className="text-xs text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors flex items-center"
                >
                  <Award className="h-3 w-3 mr-2" />
                  <span>Awards</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider border-b border-gray-200 pb-2 text-[#1a1a1a]">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-[#FAFAFA] text-[#1a1a1a] border border-gray-300 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-3 w-3" />
                </div>
                <span className="text-xs text-[#1a1a1a]/60">Greenlake City</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-[#FAFAFA] text-[#1a1a1a] border border-gray-300 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-3 w-3" />
                </div>
                <span className="text-xs text-[#1a1a1a]/60">hello@haluland.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider border-b border-gray-200 pb-2 text-[#1a1a1a]">
              Newsletter
            </h3>
            <p className="text-xs text-[#1a1a1a]/60 leading-relaxed">
              Subscribe to our newsletter for weekly updates on the
              entertainment world.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-[#FAFAFA] text-[#1a1a1a] border border-gray-300 px-4 py-2 text-xs font-normal focus:outline-none focus:border-[#2a2a2a] transition-all"
              />
              <button className="w-full bg-[#2a2a2a] text-white font-semibold px-6 py-2 text-xs uppercase tracking-wider hover:bg-[#2a2a2a]/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="bg-[#FAFAFA] text-[#1a1a1a] border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-xs font-semibold">
              © {currentYear} Haluland. All rights reserved.
            </div>
            <div className="flex space-x-4 text-xs">
              <Link
                href="#"
                className="text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
