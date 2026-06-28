import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export class AuditService {
  /**
   * Logs a sensitive action to the database.
   */
  static async logAction(data: {
    userId?: string;
    action: string;
    entity: string;
    entityId: string;
    details?: any;
    requestId?: string;
  }) {
    try {
      const log = await prisma.auditLog.create({
        data: {
          userId: data.userId || null,
          action: data.action,
          entity: data.entity,
          entityId: data.entityId,
          details: data.details || undefined,
        },
      });

      logger.info(`Audit: ${data.action} on ${data.entity} (${data.entityId})`, {
        auditId: log.id,
        userId: data.userId,
        requestId: data.requestId,
      });

      return log;
    } catch (error) {
      // We don't want audit logging to break the main transaction, but we must log the failure
      logger.error('Failed to write audit log', { error, data });
    }
  }
}
