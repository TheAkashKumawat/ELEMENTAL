'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { SearchModal } from './SearchModal';
import { MobileNav } from './MobileNav';
import { clsx } from 'clsx';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const { items, openCart } = useCartStore();
  const { wishlistIds } = useWishlistStore();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Cmd+K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'All Pieces', href: '/products' },
    { label: 'Apparel', href: '/category/apparel' },
    { label: 'Footwear', href: '/category/footwear' },
    { label: 'Accessories', href: '/category/accessories' },
    { label: 'Home Living', href: '/category/home' },
  ];

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-40 w-full transition-all duration-300',
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-stone-200/80 py-3.5'
            : 'bg-white border-b border-stone-200/60 py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Mobile Menu Trigger & Desktop Nav */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden text-stone-900 p-1.5 -ml-1.5 hover:text-stone-600 focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      'text-xs uppercase tracking-[0.14em] font-medium transition-colors hover:text-stone-950 relative py-1',
                      isActive ? 'text-stone-950 font-semibold' : 'text-stone-600'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-stone-950 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div className="text-center">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-serif font-bold tracking-[0.25em] text-stone-950 hover:opacity-90 transition-opacity uppercase"
            >
              ELEMENTAL
            </Link>
          </div>

          {/* Right: Actions (Search, Wishlist, Account, Cart) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 text-stone-700 hover:text-stone-950 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Search store"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-xs text-stone-400 font-sans tracking-wide">
                Search <kbd className="font-mono text-[10px] bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">⌘K</kbd>
              </span>
            </button>

            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className="relative text-stone-700 hover:text-stone-950 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="View Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-stone-900 text-white rounded-full text-[10px] flex items-center justify-center font-semibold">
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="text-stone-700 hover:text-stone-950 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Client Account"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 bg-stone-950 text-white hover:bg-stone-800 px-3 py-2 rounded-full transition-all duration-200 shadow-xs active:scale-95"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-wider">
                {cartCount}
              </span>
            </button>

          </div>

        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Nav */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
};
