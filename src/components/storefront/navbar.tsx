"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CartDrawer } from "./cart-drawer";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <span className="text-xl font-extrabold tracking-tight">NovaFlow</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                  Home
                </Link>
                <Link href="/products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  Shop
                </Link>
                <Link href="/categories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  Categories
                </Link>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative">
                <ShoppingBag className="h-5 w-5" />
                {isMounted && totalItems > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Open cart</span>
              </Button>

              <div className="hidden md:flex items-center gap-4">
                {session ? (
                  <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-sm font-medium hover:underline">
                      Dashboard
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => signOut()}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button asChild variant="default" size="sm">
                    <Link href="/login">Sign In</Link>
                  </Button>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="-mr-2 flex md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="space-y-1 px-4 pb-3 pt-2">
              <Link href="/" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-muted" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/products" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted" onClick={() => setIsMobileMenuOpen(false)}>
                Shop
              </Link>
              {session ? (
                <>
                  <Link href="/dashboard" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted" onClick={() => setIsMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Button variant="outline" className="w-full mt-2" onClick={() => { signOut(); setIsMobileMenuOpen(false); }}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button asChild variant="default" className="w-full mt-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Link href="/login">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </motion.nav>

      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
