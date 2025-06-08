import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-950 text-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="https://res.cloudinary.com/dn3wcoghh/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1749364328/dev/haluland-media/internal/haluland-radius_irkr2b.png"
                  alt="Haluland Logo"
                />
                <AvatarFallback>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <span className="text-white font-bold">H</span>
                  </div>
                </AvatarFallback>
              </Avatar>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Haluland
              </span>
            </div>
            <p className="text-gray-400">
              Your ultimate destination for music and movie entertainment news,
              bringing you the latest in showbiz from around the world.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=music"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <div className="flex items-center">
                    <Music className="h-4 w-4 mr-2" />
                    <span>Music</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=movies"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <div className="flex items-center">
                    <Film className="h-4 w-4 mr-2" />
                    <span>Movies</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=tv-shows"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <div className="flex items-center">
                    <Tv className="h-4 w-4 mr-2" />
                    <span>TV Shows</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=awards"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    <span>Awards</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Ciledug Rock City</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">(555) xxx-xxx</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">hello@haluland.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-gray-400">
              Subscribe to our newsletter for weekly updates on the
              entertainment world.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 border-gray-700 focus:border-purple-500"
              />
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="bg-black/30">
        <div className="container mx-auto px-4 py-6">
          <Separator className="mb-6 bg-gray-800" />
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Haluland. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
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
