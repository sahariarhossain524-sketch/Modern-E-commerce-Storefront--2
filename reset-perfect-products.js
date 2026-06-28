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

const perfectProducts = {
  'electronics': [
    { name: 'Premium Laptop', price: 999.99, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80' },
    { name: 'Wireless Headphones', price: 199.99, img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80' },
    { name: 'Smartphone Pro', price: 899.99, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80' },
    { name: 'Mirrorless Camera', price: 1299.99, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80' }
  ],
  'fashion': [
    { name: 'Running Sneakers', price: 89.99, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
    { name: 'Classic White Shoes', price: 65.00, img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80' },
    { name: 'Cotton T-Shirt', price: 29.99, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80' },
    { name: 'Denim Jacket', price: 110.00, img: 'https://images.unsplash.com/photo-1551028719-012132b929b4?w=500&q=80' }
  ],
  'home-kitchen': [
    { name: 'Coffee Maker', price: 149.99, img: 'https://images.unsplash.com/photo-1517701550927-30cfcb64d4ed?w=500&q=80' },
    { name: 'Modern Sofa', price: 499.99, img: 'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=500&q=80' },
    { name: 'Decor Plant', price: 45.00, img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80' },
    { name: 'Dining Set', price: 250.00, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80' }
  ],
  'beauty': [
    { name: 'Makeup Brush Set', price: 35.00, img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80' },
    { name: 'Luxury Perfume', price: 120.00, img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80' },
    { name: 'Skincare Routine Set', price: 65.00, img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80' },
    { name: 'Facial Serum', price: 45.00, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80' }
  ],
  'sports': [
    { name: 'Adjustable Dumbbells', price: 250.00, img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80' },
    { name: 'Premium Yoga Mat', price: 35.00, img: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80' },
    { name: 'Gym Water Bottle', price: 15.00, img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&q=80' },
    { name: 'Jump Rope', price: 12.00, img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80' }
  ],
  'accessories': [
    { name: 'Leather Watch', price: 150.00, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
    { name: 'Aviator Sunglasses', price: 45.00, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80' },
    { name: 'Leather Bag', price: 120.00, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80' },
    { name: 'Silver Bracelet', price: 85.00, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80' }
  ]
};

async function main() {
  console.log('Deleting all products to reset perfectly...');
  await prisma.product.deleteMany({});
  
  // Make sure categories exist
  const dbCats = {};
  for (const cat of customCategories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { name: cat.name, slug: cat.slug, description: `Explore our collection of ${cat.name}` }
    });
    dbCats[cat.slug] = created.id;
  }

  console.log('Inserting exactly 4 unique products per category...');
  let count = 0;
  for (const [slug, products] of Object.entries(perfectProducts)) {
    const catId = dbCats[slug];
    for (const prod of products) {
      const prodSlug = prod.name.toLowerCase().replace(/ /g, '-');
      await prisma.product.create({
        data: {
          name: prod.name,
          slug: prodSlug,
          description: `Excellent choice for ${slug}. This ${prod.name} offers great value and premium quality.`,
          price: prod.price,
          inventory: 50,
          imageUrl: prod.img,
          categoryId: catId,
          status: 'ACTIVE',
        }
      });
      count++;
    }
  }

  console.log(`Successfully added exactly ${count} perfect products!`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
