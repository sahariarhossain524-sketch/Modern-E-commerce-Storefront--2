const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Software', slug: 'software' },
  { name: 'Accessories', slug: 'accessories' },
  { name: 'Office', slug: 'office' },
  { name: 'Apparel', slug: 'apparel' },
];

const images = [
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80', // Laptop
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', // Headphones
  'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&q=80', // Phone
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80', // Camera
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', // Shoes
  'https://images.unsplash.com/photo-1507646227500-4d389b0012be?w=500&q=80', // Watch
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80', // Earbuds
  'https://images.unsplash.com/photo-1572569433602-66681423403d?w=500&q=80', // Monitor
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80', // Desk setup (Fixed)
  'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80', // MacBook
];

const adjectives = ['Premium', 'Pro', 'Ultra', 'Elite', 'Smart', 'Advanced', 'Wireless', 'Ergonomic', 'Next-Gen', 'Minimalist'];
const nouns = ['Laptop', 'Headphones', 'Monitor', 'Keyboard', 'Mouse', 'Desk', 'Chair', 'Speaker', 'Tablet', 'Camera'];

async function main() {
  console.log('Seeding 30 products...');
  
  // Get or create categories
  const dbCategories = [];
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { name: cat.name, slug: cat.slug, description: `Amazing ${cat.name}` }
    });
    dbCategories.push(created);
  }

  // Create 30 products
  let count = 0;
  for (let i = 0; i < 30; i++) {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const name = `${adj} ${noun} ${i + 1}`;
    const slug = name.toLowerCase().replace(/ /g, '-');
    const price = Math.floor(Math.random() * 900) + 99.99;
    const cat = dbCategories[Math.floor(Math.random() * dbCategories.length)];
    const img = images[Math.floor(Math.random() * images.length)];

    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        name,
        slug,
        description: `Experience the best with the ${name}. Perfect for your daily needs with premium build quality and advanced features.`,
        price,
        inventory: Math.floor(Math.random() * 100) + 10,
        imageUrl: img,
        categoryId: cat.id,
        status: 'ACTIVE',
      }
    });
    count++;
  }

  console.log(`Successfully seeded ${count} products with images!`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
