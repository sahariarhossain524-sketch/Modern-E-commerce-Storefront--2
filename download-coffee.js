const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Downloading reliable coffee image...');
  const imageUrl = 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&q=80';
  
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const publicPath = path.join(__dirname, 'public', 'coffee-maker.jpg');
  fs.writeFileSync(publicPath, buffer);
  
  console.log('Saved to public/coffee-maker.jpg. Updating DB...');

  await prisma.product.updateMany({
    where: { name: 'Coffee Maker' },
    data: { imageUrl: '/coffee-maker.jpg' }
  });

  console.log('Update complete!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
