import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { DashboardShell } from '@/components/dashboard-shell';
import { prisma } from '@uwrap/database';
import { ProjectsList } from '@/components/projects-list';

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      organizations: {
        include: {
          organization: {
            include: {
              projects: {
                orderBy: { updatedAt: 'desc' },
                include: {
                  _count: {
                    select: {
                      scripts: true,
                      shootingDays: true,
                      assets: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    redirect('/login');
  }

  const projects = user.organizations.flatMap((org: any) =>
    org.organization.projects.map((p: any) => ({
      ...p,
      organizationName: org.organization.name,
    }))
  );

  return (
    <DashboardShell user={session.user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Projects
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage all your video projects
            </p>
          </div>
        </div>

        <ProjectsList projects={projects} />
      </div>
    </DashboardShell>
  );
}
