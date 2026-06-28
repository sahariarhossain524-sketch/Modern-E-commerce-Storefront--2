import { prisma } from '@/lib/prisma';
import { Session, Prisma } from '@prisma/client';

export class SessionRepository {
  async create(data: Prisma.SessionCreateInput): Promise<Session> {
    return prisma.session.create({ data });
  }

  async findByToken(refreshToken: string): Promise<Session | null> {
    return prisma.session.findUnique({
      where: { refreshToken },
    });
  }

  async deleteByToken(refreshToken: string): Promise<void> {
    await prisma.session.delete({
      where: { refreshToken },
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await prisma.session.deleteMany({
      where: { userId },
    });
  }
}
