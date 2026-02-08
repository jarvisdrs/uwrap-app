'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Folder,
  FileText,
  Calendar,
  ImageIcon,
  ChevronLeft,
  MoreHorizontal,
  Edit3,
  Clock,
  Users,
} from 'lucide-react';
import { Card, Badge, Button, Separator } from '@uwrap/ui';
import { formatDate } from '@uwrap/ui';
import { ScriptEditor } from '@/components/script-editor';

interface ProjectDetailProps {
  project: any;
}

const statusColors: Record<string, string> = {
  IDEA: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  PRE_PRODUCTION: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  PRODUCTION: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  POST_PRODUCTION: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  COMPLETED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  ARCHIVED: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
};

const statusLabels: Record<string, string> = {
  IDEA: 'Idea',
  PRE_PRODUCTION: 'Pre-Production',
  PRODUCTION: 'Production',
  POST_PRODUCTION: 'Post-Production',
  COMPLETED: 'Completed',
  ARCHIVED: 'Archived',
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'scripts', label: `Scripts (${project.scripts.length})` },
    { id: 'schedule', label: 'Schedule' },
    { id: 'assets', label: 'Assets' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className={statusColors[project.status]}>
                {statusLabels[project.status]}
              </Badge>
              <span className="text-sm text-slate-500">{project.organization?.name || 'No org'}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {project.name}
            </h1>
            
            {project.description && (
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                {project.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Edit3 className="w-4 h-4" />
            Edit
          </Button>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={FileText}
          label="Scripts"
          value={project._count?.scripts || 0}
        />
        <StatCard
          icon={Calendar}
          label="Shooting Days"
          value={project._count?.shootingDays || 0}
        />
        <StatCard
          icon={ImageIcon}
          label="Assets"
          value={project._count?.assets || 0}
        />
        <StatCard
          icon={Clock}
          label="Last Updated"
          value={formatDate(project.updatedAt)}
        />
      </div>

      {/* Simple Tab Navigation */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-uwrap-600 border-b-2 border-uwrap-600'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Recent Scripts</h3>
              {project.scripts.length === 0 ? (
                <p className="text-slate-500">No scripts yet</p>
              ) : (
                <div className="space-y-3">
                  {project.scripts.slice(0, 3).map((script: any) => (
                    <Link
                      key={script.id}
                      href={`/projects/${project.id}/scripts/${script.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <FileText className="w-5 h-5 text-slate-400" />
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-white">{script.title}</p>
                        <p className="text-sm text-slate-500">
                          v{script.version} • {formatDate(script.updatedAt)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Upcoming Shoots</h3>
              {project.shootingDays?.length === 0 ? (
                <p className="text-slate-500">No shooting days scheduled</p>
              ) : (
                <div className="space-y-3">
                  {project.shootingDays?.slice(0, 3).map((day: any) => (
                    <div
                      key={day.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-uwrap-100 dark:bg-uwrap-900/30 flex items-center justify-center">
                        <span className="text-sm font-bold text-uwrap-700 dark:text-uwrap-300">
                          {new Date(day.date).getDate()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-white">{day.title}</p>
                        <p className="text-sm text-slate-500">{day.location || 'No location'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        {activeTab === 'scripts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Scripts</h2>
              <Button className="gap-2">
                <FileText className="w-4 h-4" />
                New Script
              </Button>
            </div>

            {project.scripts.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No scripts yet</h3>
                <Button>Create your first script</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.scripts.map((script: any) => (
                  <Link key={script.id} href={`/projects/${project.id}/scripts/${script.id}`}>
                    <Card className="p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-uwrap-100 dark:bg-uwrap-900/30 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-uwrap-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{script.title}</h3>
                            <p className="text-sm text-slate-500">Version {script.version}</p>
                          </div>
                        </div>
                        
                        {script.isLocked && (
                          <Badge variant="secondary">Locked</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
                        <span>By {script.createdBy?.name || 'Unknown'}</span>
                        <span>•</span>
                        <span>{formatDate(script.updatedAt)}</span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Schedule coming soon</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Drag-and-drop timeline will be available in the next update
            </p>
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Asset management coming soon</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Upload and organize your production assets
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">{value}</p>
        </div>
      </div>
    </Card>
  );
}
