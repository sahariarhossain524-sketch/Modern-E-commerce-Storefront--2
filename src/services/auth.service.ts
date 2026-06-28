import { UserRepository } from '@/repositories/user.repository';
import { SessionRepository } from '@/repositories/session.repository';
import { RoleRepository } from '@/repositories/role.repository';
import { hashPassword, comparePasswords } from '@/lib/bcrypt';
import { signAccessToken, signRefreshToken } from '@/lib/jwt';

const userRepository = new UserRepository();
const sessionRepository = new SessionRepository();
const roleRepository = new RoleRepository();

export class AuthService {
  async register(data: any) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email is already in use');
    }

    let role = await roleRepository.findByName('User');
    if (!role) {
      await roleRepository.createDefaultRoles();
      role = await roleRepository.findByName('User');
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await userRepository.create({
      email: data.email,
      passwordHash: hashedPassword,
      name: data.name,
      role: { connect: { id: role!.id } },
    });

    return user;
  }

  async login(data: any, userAgent?: string, ipAddress?: string) {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValidPassword = await comparePasswords(data.password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    const payload = { userId: user.id, roleId: user.roleId };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    // Save session in DB
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await sessionRepository.create({
      user: { connect: { id: user.id } },
      refreshToken,
      userAgent,
      ipAddress,
      expiresAt,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: (user as any).role?.name,
      },
    };
  }

  async logout(refreshToken: string) {
    await sessionRepository.deleteByToken(refreshToken);
  }
}
