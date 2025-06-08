"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiArrowLeft } from "react-icons/fi";
import { FaCartArrowDown } from "react-icons/fa";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";

  const navLink = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      onClick={() => setMobileMenuOpen(false)}
      className={`block sm:inline px-4 py-2 rounded-md hover:text-blue-600 transition ${
        pathname === href ? "text-blue-600 font-semibold" : "text-gray-700"
      }`}
    >
      {label}
    </Link>
  );

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {!isHome && (
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-blue-600 mr-2 sm:mr-4"
              aria-label="Go back"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
          )}
          <Link href="/" className="text-xl font-bold text-blue-600">
            My online store
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="sm:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop menu */}
          <div className="hidden sm:flex gap-2">
            {navLink("/", "Home")}
            {navLink("/saved", "Wishlist")}
            {navLink("/orders", "Orders")}
          </div>

          {/* Cart icon always visible */}
          <Link href="/cart" className="relative">
            <FaCartArrowDown className="w-6 h-6 text-gray-700 hover:text-blue-600" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white shadow px-4 py-2 space-y-2">
          {navLink("/", "Home")}
          {navLink("/saved", "Wishlist")}
          {navLink("/orders", "Orders")}
        </div>
      )}
    </nav>
  );
}
