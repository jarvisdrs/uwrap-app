import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';

@Injectable()
export class ProjectsService {
  async findAll(orgId?: string) {
    return prisma.project.findMany({
      where: orgId ? { organizationId: orgId } : undefined,
      orderBy: { updatedAt: 'desc' },
      include: {
        organization: { select: { id: true, name: true } },
        _count: {
          select: {
            scripts: true,
            shootingDays: true,
            assets: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return prisma.project.findUnique({
      where: { id },
      include: {
        organization: true,
        scripts: {
          orderBy: { updatedAt: 'desc' },
        },
        shootingDays: {
          orderBy: { order: 'asc' },
        },
        assets: {
          take: 20,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async create(data: any) {
    return prisma.project.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return prisma.project.delete({
      where: { id },
    });
  }
}
