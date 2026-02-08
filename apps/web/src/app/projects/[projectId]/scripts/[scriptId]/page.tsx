import { getServerSession } from 'next-auth/next';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { DashboardShell } from '@/components/dashboard-shell';
import { prisma } from '@uwrap/database';
import { ScriptEditor } from '@/components/script-editor';
import Link from 'next/link';
import { ChevronLeft, FileText } from 'lucide-react';
import { Button } from '@uwrap/ui';

interface ScriptPageProps {
  params: { projectId: string; scriptId: string };
}

export default async function ScriptPage({ params }: ScriptPageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/login');
  }

  const script = await prisma.script.findUnique({
    where: { id: params.scriptId },
    include: {
      project: true,
      lockedBy: {
        select: { id: true, name: true },
      },
    },
  });

  if (!script || script.projectId !== params.projectId) {
    notFound();
  }

  return (
    <DashboardShell user={session.user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Link
                href={`/projects/${params.projectId}`}
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Project
              </Link>
              <span className="text-slate-400">/</span>
              <span className="text-slate-900 dark:text-white">{script.title}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-uwrap-100 dark:bg-uwrap-900/30 flex items-center justify-center">
                <FileText className="w-5 h-5 text-uwrap-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {script.title}
                </h1>
                <p className="text-sm text-slate-500">
                  Version {script.version} • Last updated {script.updatedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline">Version History</Button>
            <Button variant="outline">Share</Button>
          </div>
        </div>

        {/* Script Editor */}
        <ScriptEditor
          initialContent={script.content}
          isLocked={script.isLocked}
          lockedBy={script.lockedBy?.name}
        />
      </div>
    </DashboardShell>
  );
}
