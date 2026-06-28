"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number | any;
    imageUrl?: string | null;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const priceNum = Number(product.price);
  const oldPrice = (priceNum * 1.3).toFixed(2); // Fake old price

  // Generate consistent fake rating
  const rating = 4 + (product.name.length % 10) / 10;
  const reviewsCount = 40 + (product.name.length * 3);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: priceNum,
      quantity: 1,
      image: product.imageUrl || undefined,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-shadow duration-300 h-full"
    >
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] bg-[#f8f8f8] overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
            No Image
          </div>
        )}
      </Link>
      
      {/* Heart Icon */}
      <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-red-50 hover:text-red-500 transition-colors z-10 text-gray-500 shadow-sm opacity-0 group-hover:opacity-100 duration-300">
        <Heart className="h-4 w-4" />
      </button>

      <div className="p-4 flex flex-col flex-grow bg-white">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mt-1.5 mb-2">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
          <span className="text-xs text-gray-400">({reviewsCount})</span>
        </div>

        <div className="flex items-center gap-2 mt-auto mb-4">
          <span className="font-bold text-gray-900">${priceNum.toFixed(2)}</span>
          <span className="text-sm text-gray-400 line-through">${oldPrice}</span>
        </div>

        <Button 
          className="w-full gap-2 rounded-lg font-medium shadow-none group-hover:shadow-md transition-shadow" 
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
