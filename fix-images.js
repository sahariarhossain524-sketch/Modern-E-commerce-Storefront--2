const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const brokenUrl = 'https://images.unsplash.com/photo-1593640498182-41c70c826e17?w=500&q=80';
  const newUrl = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80';

  const result = await prisma.product.updateMany({
    where: { imageUrl: brokenUrl },
    data: { imageUrl: newUrl }
  });

  console.log(`Updated ${result.count} products with the fixed image URL.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
