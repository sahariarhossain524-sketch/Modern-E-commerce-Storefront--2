"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string | null;
    inventory: number;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.imageUrl || undefined,
    });
    toast.success(`Added ${quantity} ${product.name} to cart`);
    setQuantity(1); // Reset after adding
  };

  const isOutOfStock = product.inventory <= 0;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center border rounded-md h-12 w-fit">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={isOutOfStock}
          className="rounded-none h-full"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="flex h-full w-12 items-center justify-center font-medium text-lg border-x">
          {quantity}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
          disabled={isOutOfStock || quantity >= product.inventory}
          className="rounded-none h-full"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <Button 
        size="lg" 
        className="h-12 flex-1 gap-2 text-base" 
        onClick={handleAdd}
        disabled={isOutOfStock}
      >
        <ShoppingCart className="h-5 w-5" /> 
        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}
