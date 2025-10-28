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
    <footer className="bg-black text-white border-t-4 border-black">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="h-14 w-14 border-4 border-white bg-white rotate-[-5deg] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all duration-200 overflow-hidden">
                <div className="rotate-[5deg] relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Haluland Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-3xl font-black uppercase group-hover:text-yellow-300 transition-colors">
                haluland
              </span>
            </Link>
            <p className="font-bold text-white/80">
              Your ultimate destination for music and movie entertainment news,
              bringing you the latest in showbiz from around the world.
            </p>
            <div className="flex space-x-3">
              <Link
                href="#"
                className="w-10 h-10 bg-white text-black border-4 border-white hover:bg-yellow-300 transition-colors flex items-center justify-center hover:translate-y-[-2px]"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white text-black border-4 border-white hover:bg-blue-300 transition-colors flex items-center justify-center hover:translate-y-[-2px]"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white text-black border-4 border-white hover:bg-pink-300 transition-colors flex items-center justify-center hover:translate-y-[-2px]"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white text-black border-4 border-white hover:bg-red-300 transition-colors flex items-center justify-center hover:translate-y-[-2px]"
              >
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase border-b-4 border-white pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="font-bold hover:text-yellow-300 transition-colors inline-block hover:translate-x-1"
                >
                  → Home
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="font-bold hover:text-yellow-300 transition-colors inline-block hover:translate-x-1"
                >
                  → Search
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=music"
                  className="font-bold hover:text-yellow-300 transition-colors"
                >
                  <div className="flex items-center hover:translate-x-1 transition-transform">
                    <Music className="h-4 w-4 mr-2" />
                    <span>Music</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=movies"
                  className="font-bold hover:text-yellow-300 transition-colors"
                >
                  <div className="flex items-center hover:translate-x-1 transition-transform">
                    <Film className="h-4 w-4 mr-2" />
                    <span>Movies</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=tv-shows"
                  className="font-bold hover:text-yellow-300 transition-colors"
                >
                  <div className="flex items-center hover:translate-x-1 transition-transform">
                    <Tv className="h-4 w-4 mr-2" />
                    <span>TV Shows</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=awards"
                  className="font-bold hover:text-yellow-300 transition-colors"
                >
                  <div className="flex items-center hover:translate-x-1 transition-transform">
                    <Award className="h-4 w-4 mr-2" />
                    <span>Awards</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase border-b-4 border-white pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white text-black border-4 border-white flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="font-bold">Ciledug Rock City</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white text-black border-4 border-white flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="font-bold">(555) xxx-xxx</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white text-black border-4 border-white flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="font-bold">hello@haluland.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase border-b-4 border-white pb-2">
              Newsletter
            </h3>
            <p className="font-bold text-white/80">
              Subscribe to our newsletter for weekly updates on the
              entertainment world.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white text-black border-4 border-white px-4 py-2 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
              />
              <button className="w-full bg-yellow-300 text-black font-black uppercase px-6 py-3 border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="bg-white text-black border-t-4 border-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm font-black uppercase">
              © {currentYear} Haluland. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm font-bold">
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors"
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
