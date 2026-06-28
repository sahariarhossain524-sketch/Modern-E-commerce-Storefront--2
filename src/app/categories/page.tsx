import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Navbar } from "@/components/storefront/navbar";
import { Footer } from "@/components/storefront/footer";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">All Categories</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/categories/${cat.slug}`}
              className="group block p-6 bg-[#F8FAF8] rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                {cat.name}
              </h2>
              <p className="text-gray-500 mt-2">
                {cat._count.products} Products
              </p>
            </Link>
          ))}
        </div>
        
        {categories.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No categories found.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
