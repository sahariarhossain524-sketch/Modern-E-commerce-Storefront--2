const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fixing the broken Coffee Maker image...');
  
  // Use a reliable coffee-related image
  const workingImage = 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&q=80';

  const result = await prisma.product.updateMany({
    where: { name: 'Coffee Maker' },
    data: { imageUrl: workingImage }
  });

  console.log(`Updated ${result.count} product(s) named "Coffee Maker" with a working image.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
