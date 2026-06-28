import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/storefront/navbar";
import { Footer } from "@/components/storefront/footer";
import { ProductCard } from "@/components/storefront/product-card";

export const dynamic = "force-dynamic";

export default async function CategoryViewPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = await prisma.category.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      products: {
        where: { status: 'ACTIVE', isDeleted: false }
      }
    }
  });

  if (!category) {
    notFound();
  }

  const products = category.products.map(p => ({
    ...p,
    price: Number(p.price)
  }));

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{category.name}</h1>
        <p className="text-gray-500 mb-12">{category.description}</p>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products found in this category.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
