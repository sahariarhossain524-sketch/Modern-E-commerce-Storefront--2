const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const coffee = await prisma.product.findFirst({
    where: { name: 'Coffee Maker' }
  });
  console.log('Coffee Maker in DB:', coffee);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
