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
    <footer className="bg-[#3D3529] text-white border-t border-[#C4B5A0]/40">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="h-12 w-12 border border-[#C4B5A0]/40 bg-white flex items-center justify-center hover:shadow-md transition-all duration-200 overflow-hidden rounded-xs">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Haluland Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-xl font-semibold group-hover:text-[#0C3E2D] transition-colors">
                haluland
              </span>
            </Link>
            <p className="text-xs text-white/70 leading-relaxed">
              Your ultimate destination for music and movie entertainment news,
              bringing you the latest in showbiz from around the world.
            </p>
            <div className="flex space-x-2">
              <Link
                href="#"
                className="w-8 h-8 bg-white text-[#3D3529] border border-[#C4B5A0]/40 hover:bg-[#F5F1E8] transition-colors flex items-center justify-center rounded-xs"
              >
                <Facebook size={16} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-white text-[#3D3529] border border-[#C4B5A0]/40 hover:bg-[#F5F1E8] transition-colors flex items-center justify-center rounded-xs"
              >
                <Twitter size={16} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-white text-[#3D3529] border border-[#C4B5A0]/40 hover:bg-[#F5F1E8] transition-colors flex items-center justify-center rounded-xs"
              >
                <Instagram size={16} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-white text-[#3D3529] border border-[#C4B5A0]/40 hover:bg-[#F5F1E8] transition-colors flex items-center justify-center rounded-xs"
              >
                <Youtube size={16} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase border-b border-[#C4B5A0]/40 pb-2 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-xs text-white/70 hover:text-[#0C3E2D] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-xs text-white/70 hover:text-[#0C3E2D] transition-colors"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=music"
                  className="text-xs text-white/70 hover:text-[#0C3E2D] transition-colors flex items-center"
                >
                  <Music className="h-3 w-3 mr-2" />
                  <span>Music</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=movies"
                  className="text-xs text-white/70 hover:text-[#0C3E2D] transition-colors flex items-center"
                >
                  <Film className="h-3 w-3 mr-2" />
                  <span>Movies</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=tv-shows"
                  className="text-xs text-white/70 hover:text-[#0C3E2D] transition-colors flex items-center"
                >
                  <Tv className="h-3 w-3 mr-2" />
                  <span>TV Shows</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=awards"
                  className="text-xs text-white/70 hover:text-[#0C3E2D] transition-colors flex items-center"
                >
                  <Award className="h-3 w-3 mr-2" />
                  <span>Awards</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase border-b border-[#C4B5A0]/40 pb-2 text-white">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white text-[#3D3529] border border-[#C4B5A0]/40 flex items-center justify-center flex-shrink-0 rounded-xs">
                  <MapPin className="h-3 w-3" />
                </div>
                <span className="text-xs text-white/70">Greenlake City</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white text-[#3D3529] border border-[#C4B5A0]/40 flex items-center justify-center flex-shrink-0 rounded-xs">
                  <Phone className="h-3 w-3" />
                </div>
                <span className="text-xs text-white/70">(---) --------</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white text-[#3D3529] border border-[#C4B5A0]/40 flex items-center justify-center flex-shrink-0 rounded-xs">
                  <Mail className="h-3 w-3" />
                </div>
                <span className="text-xs text-white/70">hello@haluland.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase border-b border-[#C4B5A0]/40 pb-2 text-white">
              Newsletter
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Subscribe to our newsletter for weekly updates on the
              entertainment world.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white text-[#3D3529] border border-[#C4B5A0]/60 px-4 py-2 text-xs font-normal rounded-xs focus:outline-none focus:ring-2 focus:ring-[#0C3E2D]/30 focus:border-[#0C3E2D] transition-all"
              />
              <button className="w-full bg-[#0C3E2D] text-white font-semibold px-6 py-2 text-xs rounded-xs hover:bg-[#0A3225] transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="bg-[#F5F1E8] text-[#3D3529] border-t border-[#C4B5A0]/40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-xs font-semibold">
              © {currentYear} Haluland. All rights reserved.
            </div>
            <div className="flex space-x-4 text-xs">
              <Link
                href="#"
                className="text-[#5A4A3A] hover:text-[#0C3E2D] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-[#5A4A3A] hover:text-[#0C3E2D] transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-[#5A4A3A] hover:text-[#0C3E2D] transition-colors"
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
