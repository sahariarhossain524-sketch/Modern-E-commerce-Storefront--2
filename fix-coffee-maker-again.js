const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fixing the Coffee Maker image again with a guaranteed working image...');
  
  // Very reliable coffee cup Unsplash image
  const workingImage = 'https://images.unsplash.com/photo-1495474472205-16284eb345d3?w=500&q=80';

  await prisma.product.updateMany({
    where: { name: 'Coffee Maker' },
    data: { imageUrl: workingImage }
  });

  console.log(`Updated successfully.`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
