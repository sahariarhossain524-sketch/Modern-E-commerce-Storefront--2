import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Headset, Quote, Star } from "lucide-react";
import { Navbar } from "@/components/storefront/navbar";
import { Footer } from "@/components/storefront/footer";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/storefront/product-card";
import { FadeIn } from "@/components/animations/fade-in";
import { Stagger } from "@/components/animations/stagger";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch featured products dynamically
  const rawFeaturedProducts = await prisma.product.findMany({
    where: { status: 'ACTIVE', isDeleted: false },
    take: 8,
    orderBy: { createdAt: 'desc' },
  });

  const featuredProducts = rawFeaturedProducts.map(p => ({
    ...p,
    price: Number(p.price),
  }));

  const categories = [
    { name: "Electronics", slug: "electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&q=80" },
    { name: "Fashion", slug: "fashion", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80" },
    { name: "Home & Kitchen", slug: "home-kitchen", image: "https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=200&q=80" },
    { name: "Beauty", slug: "beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&q=80" },
    { name: "Sports", slug: "sports", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&q=80" },
    { name: "Accessories", slug: "accessories", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&q=80" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-12 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn delay={0.1} className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                New Arrivals
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Discover The Best Products for You
              </h1>
              <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-md">
                Explore our wide range of high-quality products at affordable prices. Shop now and enjoy the best deals!
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="h-14 px-8 text-base shadow-lg shadow-primary/20 rounded-xl">
                  <Link href="/products">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-14 px-8 text-base rounded-xl border-2">
                  <Link href="/products">Explore Deals</Link>
                </Button>
              </div>
              
              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"><Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="User" width={40} height={40} className="object-cover" /></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 overflow-hidden"><Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" alt="User" width={40} height={40} className="object-cover" /></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-400 overflow-hidden"><Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="User" width={40} height={40} className="object-cover" /></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">+</div>
                </div>
                <p className="text-sm font-medium text-gray-500">
                  Trusted by <span className="text-gray-900 font-bold">10,000+</span> Happy Customers
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2} direction="left" className="relative">
              <div className="absolute inset-0 bg-[#F8FAF8] rounded-[3rem] -rotate-3 scale-105"></div>
              <div className="relative bg-[#F3F7F2] rounded-[3rem] p-8 aspect-square md:aspect-[4/3] flex items-center justify-center overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" 
                  alt="Featured Product" 
                  fill 
                  className="object-contain scale-[0.6] hover:scale-[0.65] transition-transform duration-700"
                  priority
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Features Ribbon */}
        <section className="container mx-auto px-4 mb-20">
          <Stagger className="border border-gray-100 rounded-2xl p-8 bg-white shadow-sm flex flex-wrap justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Free Shipping</h4>
                <p className="text-sm text-gray-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Secure Payment</h4>
                <p className="text-sm text-gray-500">100% secure payment</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-primary">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Easy Returns</h4>
                <p className="text-sm text-gray-500">30 days return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-primary">
                <Headset className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">24/7 Support</h4>
                <p className="text-sm text-gray-500">Dedicated support</p>
              </div>
            </div>
          </Stagger>
        </section>

        {/* Shop by Categories */}
        <section className="container mx-auto px-4 mb-24">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Shop by Categories</h2>
            <Link href="/categories" className="text-sm font-semibold text-gray-900 flex items-center hover:text-primary transition-colors">
              View All Categories <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-wrap md:flex-nowrap justify-between gap-6 overflow-x-auto pb-4 hide-scrollbar">
            {categories.map((cat, i) => (
              <Link key={i} href={`/categories/${cat.slug}`} className="flex flex-col items-center gap-4 group min-w-[120px]">
                <div className="w-32 h-32 rounded-full bg-[#f8f8f8] overflow-hidden p-2 group-hover:shadow-md transition-shadow">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <span className="font-semibold text-sm text-gray-900">{cat.name}</span>
              </Link>
            ))}
          </div>
          </FadeIn>
        </section>

        {/* Best Selling Products */}
        <section className="container mx-auto px-4 mb-24">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Best Selling Products</h2>
            <Link href="/products" className="text-sm font-semibold text-gray-900 flex items-center hover:text-primary transition-colors">
              View All Products <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          </FadeIn>
        </section>

        {/* Promo Banner */}
        <section className="container mx-auto px-4 mb-24">
          <FadeIn direction="up">
            <div className="bg-[#FAF7F0] rounded-3xl overflow-hidden grid md:grid-cols-2">
            <div className="p-12 md:p-20 flex flex-col justify-center">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Special Offer</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Up to 50% Off</h2>
              <p className="text-gray-600 mb-8 max-w-sm">
                Limited time offer on selected items. Hurry up and grab the best deals!
              </p>
              <Button size="lg" asChild className="w-fit h-12 px-8 rounded-xl shadow-lg shadow-primary/20">
                <Link href="/products">Shop the Sale <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
            <div className="relative min-h-[300px] bg-[#F3EFE6]">
              <Image 
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80" 
                alt="Promo" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
          </FadeIn>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 mb-24">
          <FadeIn direction="up">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">What Our Customers Say</h2>
            <Stagger className="grid md:grid-cols-3 gap-8">
            {[
              { name: "John D.", text: "Amazing products and fast delivery! NovaFlow is my go-to store for all my needs." },
              { name: "Sarah L.", text: "The quality of the clothes is fantastic. Will definitely buy again." },
              { name: "Michael T.", text: "Very happy with my purchase. Highly recommend NovaFlow to everyone!" }
            ].map((review, i) => (
              <div key={i} className="bg-[#F8FAF8] rounded-2xl p-8 border border-green-50/50">
                <div className="w-10 h-10 rounded-full bg-green-100 text-primary flex items-center justify-center mb-6">
                  <Quote className="w-5 h-5 fill-current" />
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden relative">
                    <Image src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&fit=crop&crop=faces&auto=format`} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </Stagger>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  );
}
