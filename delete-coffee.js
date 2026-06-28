const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Deleting the Coffee Maker product...');
  
  const result = await prisma.product.deleteMany({
    where: { name: 'Coffee Maker' }
  });

  console.log(`Successfully deleted ${result.count} product(s) named "Coffee Maker".`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
