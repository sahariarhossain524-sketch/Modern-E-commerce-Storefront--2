import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/storefront/navbar";
import { Footer } from "@/components/storefront/footer";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "./add-to-cart-button";

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  
  const product = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug, isDeleted: false, status: 'ACTIVE' },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  const priceNum = Number(product.price);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted border">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-secondary text-muted-foreground">
                No Image Available
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              {product.category && (
                <span className="text-sm font-medium text-primary uppercase tracking-wider mb-2 block">
                  {product.category.name}
                </span>
              )}
              <h1 className="text-4xl font-extrabold tracking-tight">{product.name}</h1>
              <p className="mt-4 text-3xl font-bold text-muted-foreground">${priceNum.toFixed(2)}</p>
            </div>

            <div className="prose dark:prose-invert">
              <p className="text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="pt-6 border-t">
              <div className="flex items-center gap-4 text-sm mb-6">
                <span className="flex items-center gap-1">
                  <div className={`h-2 w-2 rounded-full ${product.inventory > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  {product.inventory > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">Free Shipping</span>
              </div>
              
              <AddToCartButton 
                product={{
                  id: product.id,
                  name: product.name,
                  price: priceNum,
                  imageUrl: product.imageUrl,
                  inventory: product.inventory
                }} 
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
