import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';

@Injectable()
export class AssetsService {
  async findByProject(projectId: string, type?: string) {
    return prisma.asset.findMany({
      where: {
        projectId,
        type: type as any,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        uploadedBy: { select: { id: true, name: true, image: true } },
      },
    });
  }

  async findOne(id: string) {
    return prisma.asset.findUnique({
      where: { id },
      include: {
        project: true,
        uploadedBy: { select: { id: true, name: true, image: true } },
      },
    });
  }

  async create(data: any) {
    return prisma.asset.create({
      data,
    });
  }

  async remove(id: string) {
    return prisma.asset.delete({
      where: { id },
    });
  }
}
