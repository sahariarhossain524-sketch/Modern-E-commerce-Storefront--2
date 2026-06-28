const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Find Minimalist Headphones 2 to see what its broken image URL is
  const brokenProduct = await prisma.product.findFirst({
    where: { name: 'Minimalist Headphones 2' }
  });

  if (brokenProduct && brokenProduct.imageUrl) {
    const brokenUrl = brokenProduct.imageUrl;
    const workingHeadphoneUrl = 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80';
    
    // Replace everywhere this broken URL was used
    const res = await prisma.product.updateMany({
      where: { imageUrl: brokenUrl },
      data: { imageUrl: workingHeadphoneUrl }
    });
    console.log(`Updated ${res.count} products that had the broken headphone image.`);
  }

  // Update Enterprise Laptop
  const laptopUrl = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80';
  const res2 = await prisma.product.updateMany({
    where: { name: 'Enterprise Laptop' },
    data: { imageUrl: laptopUrl }
  });
  console.log(`Updated ${res2.count} products named Enterprise Laptop.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
