import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { DashboardClient } from '@/components/dashboard-client';
import { projectsApi, Project } from '@/lib/api';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  // Fetch real projects from API
  let projects: Project[] = [];
  let error: string | null = null;

  try {
    const result = await projectsApi.getAll();
    if (result.error) {
      error = result.error;
    } else {
      projects = result.data || [];
    }
  } catch (err) {
    error = 'Failed to load projects';
  }

  return <DashboardClient user={session.user} projects={projects} error={error} />;
}