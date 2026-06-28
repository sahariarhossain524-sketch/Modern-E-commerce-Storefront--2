const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const customCategories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Home & Kitchen', slug: 'home-kitchen' },
  { name: 'Beauty', slug: 'beauty' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Accessories', slug: 'accessories' },
];

const productsData = [
  // Electronics
  { name: 'Premium Laptop', price: 999.99, categorySlug: 'electronics', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80' },
  { name: 'Wireless Headphones', price: 199.99, categorySlug: 'electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  
  // Fashion
  { name: 'Cotton T-Shirt', price: 29.99, categorySlug: 'fashion', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80' },
  { name: 'Running Sneakers', price: 89.99, categorySlug: 'fashion', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },

  // Home & Kitchen
  { name: 'Coffee Maker', price: 149.99, categorySlug: 'home-kitchen', image: 'https://images.unsplash.com/photo-1517701550927-30cfcb64d4ed?w=500&q=80' },
  { name: 'Modern Sofa', price: 499.99, categorySlug: 'home-kitchen', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80' },

  // Beauty
  { name: 'Luxury Perfume', price: 120.00, categorySlug: 'beauty', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80' },
  { name: 'Skincare Routine Set', price: 65.00, categorySlug: 'beauty', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80' },

  // Sports
  { name: 'Adjustable Dumbbells', price: 250.00, categorySlug: 'sports', image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=500&q=80' },
  { name: 'Premium Yoga Mat', price: 35.00, categorySlug: 'sports', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80' },

  // Accessories
  { name: 'Aviator Sunglasses', price: 45.00, categorySlug: 'accessories', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80' },
  { name: 'Leather Watch', price: 150.00, categorySlug: 'accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' }
];

async function main() {
  console.log('Adding specific categories and their products...');
  
  // Create categories
  const dbCats = {};
  for (const cat of customCategories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { name: cat.name, slug: cat.slug, description: `Explore our collection of ${cat.name}` }
    });
    dbCats[cat.slug] = created.id;
  }

  // Create products
  let count = 0;
  for (const prod of productsData) {
    const slug = prod.name.toLowerCase().replace(/ /g, '-');
    await prisma.product.upsert({
      where: { slug },
      update: {
        categoryId: dbCats[prod.categorySlug],
        imageUrl: prod.image
      },
      create: {
        name: prod.name,
        slug,
        description: `High quality ${prod.name} for you.`,
        price: prod.price,
        inventory: 50,
        imageUrl: prod.image,
        categoryId: dbCats[prod.categorySlug],
        status: 'ACTIVE',
      }
    });
    count++;
  }

  console.log(`Successfully added ${count} categorized products!`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
