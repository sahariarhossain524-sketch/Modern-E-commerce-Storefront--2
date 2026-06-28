import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create Admin Role
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      description: 'System Administrator',
    },
  });

  // Create Default User Role
  await prisma.role.upsert({
    where: { name: 'User' },
    update: {},
    create: {
      name: 'User',
      description: 'Standard User',
    },
  });

  // Create Admin User
  const hashedPassword = await bcrypt.hash('NexaAdminPass123!', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@novaflow.com' },
    update: {},
    create: {
      email: 'admin@novaflow.com',
      name: 'Admin User',
      passwordHash: hashedPassword,
      roleId: adminRole.id,
      isVerified: true,
      isActive: true,
    },
  });

  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
