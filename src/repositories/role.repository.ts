import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export class RoleRepository {
  async findByName(name: string): Promise<Role | null> {
    return prisma.role.findUnique({
      where: { name },
    });
  }

  async createDefaultRoles(): Promise<void> {
    const roles = ['Admin', 'Manager', 'User'];
    for (const name of roles) {
      await prisma.role.upsert({
        where: { name },
        update: {},
        create: { name, description: `Default ${name} role` },
      });
    }
  }
}
