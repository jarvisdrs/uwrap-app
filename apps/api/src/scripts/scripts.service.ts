import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';

@Injectable()
export class ScriptsService {
  async findByProject(projectId: string) {
    return prisma.script.findMany({
      where: { projectId },
      orderBy: { updatedAt: 'desc' },
      include: {
        createdBy: { select: { id: true, name: true, image: true } },
        lockedBy: { select: { id: true, name: true } },
      },
    });
  }

  async findOne(id: string) {
    return prisma.script.findUnique({
      where: { id },
      include: {
        project: true,
        createdBy: { select: { id: true, name: true, image: true } },
        lockedBy: { select: { id: true, name: true } },
        versions: {
          orderBy: { version: 'desc' },
          take: 10,
        },
      },
    });
  }

  async create(data: any) {
    return prisma.script.create({
      data: {
        ...data,
        version: 1,
      },
    });
  }

  async update(id: string, data: any) {
    // If content is being updated, create a version
    if (data.content) {
      const current = await prisma.script.findUnique({
        where: { id },
        select: { content: true, title: true, version: true },
      });

      if (current) {
        await prisma.scriptVersion.create({
          data: {
            scriptId: id,
            version: current.version,
            title: current.title,
            content: current.content,
            createdById: data.updatedById,
          },
        });

        data.version = current.version + 1;
      }
    }

    return prisma.script.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return prisma.script.delete({
      where: { id },
    });
  }

  async lock(id: string, userId: string) {
    return prisma.script.update({
      where: { id },
      data: {
        isLocked: true,
        lockedById: userId,
        lockedAt: new Date(),
      },
    });
  }

  async unlock(id: string) {
    return prisma.script.update({
      where: { id },
      data: {
        isLocked: false,
        lockedById: null,
        lockedAt: null,
      },
    });
  }
}
