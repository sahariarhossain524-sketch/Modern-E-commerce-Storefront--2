const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categoryImages = {
  'electronics': [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80', // Laptop
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80', // Headphones
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80', // Phone
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80'  // Camera
  ],
  'fashion': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', // Shoe
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80', // Sneakers
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80', // Shirt
    'https://images.unsplash.com/photo-1551028719-012132b929b4?w=500&q=80'  // Jacket
  ],
  'home-kitchen': [
    'https://images.unsplash.com/photo-1517701550927-30cfcb64d4ed?w=500&q=80', // Coffee Maker
    'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=500&q=80', // Kitchen/Home
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80'  // Decor/Plant
  ],
  'beauty': [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80', // Makeup
    'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80', // Perfume
    'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80'  // Skincare
  ],
  'sports': [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80', // Weights
    'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80', // Yoga
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&q=80'  // Gym bottle
  ],
  'accessories': [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', // Watch
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80', // Sunglasses
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80'  // Bag
  ]
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&q=80',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80'
];

async function main() {
  console.log('Distributing diverse images across products...');
  
  const products = await prisma.product.findMany({
    include: { category: true }
  });

  const updates = products.map(prod => {
    let images = fallbackImages;
    if (prod.category && categoryImages[prod.category.slug]) {
      images = categoryImages[prod.category.slug];
    }
    
    // Pick a random image from the available array
    const newImage = images[Math.floor(Math.random() * images.length)];
    
    return prisma.product.update({
      where: { id: prod.id },
      data: { imageUrl: newImage }
    });
  });

  // Run all updates concurrently in batches to be super fast
  const batchSize = 20;
  for (let i = 0; i < updates.length; i += batchSize) {
    const batch = updates.slice(i, i + batchSize);
    await Promise.all(batch);
  }

  console.log(`Successfully assigned diverse images to ${products.length} products!`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
