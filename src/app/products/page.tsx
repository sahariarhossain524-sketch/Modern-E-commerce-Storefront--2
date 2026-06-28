import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/storefront/product-card";
import { Navbar } from "@/components/storefront/navbar";
import { Footer } from "@/components/storefront/footer";

export default async function ProductsPage() {
  const rawProducts = await prisma.product.findMany({
    where: { status: 'ACTIVE', isDeleted: false },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  const products = rawProducts.map(p => ({
    ...p,
    price: Number(p.price),
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
          <p className="text-muted-foreground mt-2">Browse our entire collection of premium products.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            No products available at the moment.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
