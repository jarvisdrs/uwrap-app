import { getServerSession } from 'next-auth/next';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { DashboardShell } from '@/components/dashboard-shell';
import { prisma } from '@uwrap/database';
import { ProjectDetail } from '@/components/project-detail';

interface ProjectPageProps {
  params: { projectId: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/login');
  }

  const project = await prisma.project.findUnique({
    where: { id: params.projectId },
    include: {
      organization: true,
      scripts: {
        orderBy: { updatedAt: 'desc' },
        include: {
          createdBy: {
            select: { id: true, name: true, image: true },
          },
        },
      },
      shootingDays: {
        orderBy: { order: 'asc' },
      },
      assets: {
        orderBy: { createdAt: 'desc' },
        take: 8,
      },
      _count: {
        select: {
          scripts: true,
          shootingDays: true,
          assets: true,
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <DashboardShell user={session.user}>
      <ProjectDetail project={project} />
    </DashboardShell>
  );
}
