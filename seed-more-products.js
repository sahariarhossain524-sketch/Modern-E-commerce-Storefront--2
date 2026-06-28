const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categoryImages = {
  'electronics': [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80',
    'https://images.unsplash.com/photo-1572569433602-66681423403d?w=500&q=80'
  ],
  'fashion': [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    'https://images.unsplash.com/photo-1434389672724-4fa1d8fe8ce3?w=500&q=80',
    'https://images.unsplash.com/photo-1551028719-012132b929b4?w=500&q=80'
  ],
  'home-kitchen': [
    'https://images.unsplash.com/photo-1517701550927-30cfcb64d4ed?w=500&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80',
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80'
  ],
  'beauty': [
    'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80',
    'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80'
  ],
  'sports': [
    'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=500&q=80',
    'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80'
  ],
  'accessories': [
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80'
  ]
};

const adjectives = ['Premium', 'Pro', 'Ultra', 'Elite', 'Smart', 'Advanced', 'Classic', 'Modern', 'Sleek', 'Essential'];
const nouns = {
  'electronics': ['Device', 'Gadget', 'System', 'Hub', 'Pad', 'Tab'],
  'fashion': ['Wear', 'Style', 'Fit', 'Collection', 'Edition'],
  'home-kitchen': ['Maker', 'Set', 'Tool', 'Appliance', 'Essence'],
  'beauty': ['Care', 'Glow', 'Serum', 'Kit', 'Essence'],
  'sports': ['Gear', 'Equipment', 'Fit', 'Active', 'Pro'],
  'accessories': ['Piece', 'Charm', 'Style', 'Band', 'Wrap']
};

async function main() {
  console.log('Adding 13 more products to each category...');
  
  let totalAdded = 0;

  for (const slug of Object.keys(categoryImages)) {
    const category = await prisma.category.findUnique({ where: { slug } });
    if (!category) continue;

    for (let i = 0; i < 13; i++) {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const nounList = nouns[slug];
      const noun = nounList[Math.floor(Math.random() * nounList.length)];
      const name = `${adj} ${category.name} ${noun} ${Math.floor(Math.random() * 1000)}`;
      const prodSlug = name.toLowerCase().replace(/ /g, '-');
      const price = Math.floor(Math.random() * 500) + 20.99;
      const images = categoryImages[slug];
      const img = images[Math.floor(Math.random() * images.length)];

      await prisma.product.upsert({
        where: { slug: prodSlug },
        update: {},
        create: {
          name,
          slug: prodSlug,
          description: `Excellent choice for ${category.name}. This ${name} offers great value and premium quality.`,
          price,
          inventory: Math.floor(Math.random() * 100) + 10,
          imageUrl: img,
          categoryId: category.id,
          status: 'ACTIVE',
        }
      });
      totalAdded++;
    }
  }

  console.log(`Successfully added ${totalAdded} more products across all categories!`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
