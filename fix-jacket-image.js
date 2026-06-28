const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fixing the broken Denim Jacket image...');
  
  // Use a reliable, tested clothing image from Unsplash
  const workingImage = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80'; // Fashion model shopping/jacket

  const result = await prisma.product.updateMany({
    where: { name: 'Denim Jacket' },
    data: { imageUrl: workingImage }
  });

  console.log(`Updated ${result.count} product(s) named "Denim Jacket" with a working image.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
