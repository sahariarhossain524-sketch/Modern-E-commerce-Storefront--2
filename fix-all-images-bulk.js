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

const fallbackImage = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80';

async function main() {
  console.log('Replacing images using bulk update...');
  let total = 0;
  
  for (const [slug, img] of Object.entries(workingImages)) {
    const cat = await prisma.category.findUnique({ where: { slug }});
    if (cat) {
      const res = await prisma.product.updateMany({
        where: { categoryId: cat.id },
        data: { imageUrl: img }
      });
      total += res.count;
      console.log(`Updated ${res.count} products for category ${slug}`);
    }
  }
  
  // Any products that didn't match those categories
  const res = await prisma.product.updateMany({
    where: { 
      NOT: {
        category: { slug: { in: Object.keys(workingImages) } }
      }
    },
    data: { imageUrl: fallbackImage }
  });
  total += res.count;
  console.log(`Updated ${res.count} products with fallback image.`);
  
  console.log(`Successfully fixed images for ${total} products!`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
