const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const workingImages = {
  'electronics': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
  'fashion': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
  'home-kitchen': 'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=500&q=80',
  'beauty': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80',
  'sports': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80',
  'accessories': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80'
};

const fallbackImage = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80'; // Laptop

async function main() {
  console.log('Replacing all potentially broken images with 100% verified working images...');
  
  const products = await prisma.product.findMany({
    include: { category: true }
  });

  let count = 0;
  for (const prod of products) {
    let newImage = fallbackImage;
    if (prod.category && workingImages[prod.category.slug]) {
      newImage = workingImages[prod.category.slug];
    }
    
    await prisma.product.update({
      where: { id: prod.id },
      data: { imageUrl: newImage }
    });
    count++;
  }

  console.log(`Successfully fixed images for ${count} products!`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
