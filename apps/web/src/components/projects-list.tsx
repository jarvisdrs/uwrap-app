'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Folder,
  MoreHorizontal,
  Calendar,
  Search,
  Plus,
  Grid3X3,
  List,
  Filter,
} from 'lucide-react';
import { Card, CardContent, Badge, Button, Input } from '@uwrap/ui';
import { formatDate } from '@uwrap/ui';

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  coverImage: string | null;
  updatedAt: Date;
  createdAt: Date;
  organizationName: string;
  _count: {
    scripts: number;
    shootingDays: number;
    assets: number;
  };
}

interface ProjectsListProps {
  projects: Project[];
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

export function ProjectsList({ projects }: ProjectsListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | 'all'>('all');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses = ['all', ...Array.from(new Set(projects.map((p) => p.status)))];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-uwrap-500"
            >
              <option value="all">All Status</option>
              {statuses.filter(s => s !== 'all').map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status] || status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <Folder className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Create your first project to get started'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredProjects.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
    >
      <Link href={`/projects/${project.id}`}>
        <Card variant="hover" className="overflow-hidden h-full">
          <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 relative">
            {project.coverImage ? (
              <img
                src={project.coverImage}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Folder className="w-16 h-16 text-slate-300" />
              </div>
            )}
            <div className="absolute top-3 right-3">
              <Badge className={statusColors[project.status]}>
                {statusLabels[project.status]}
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white truncate">
              {project.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {project.organizationName}
            </p>

            <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
              <span>{project._count.scripts} scripts</span>
              <span>{project._count.assets} assets</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
          {project.coverImage ? (
            <img src={project.coverImage} alt="" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <Folder className="w-6 h-6 text-slate-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-slate-900 dark:text-white truncate">
            {project.name}
          </h3>
          <p className="text-sm text-slate-500 truncate">{project.organizationName}</p>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <div className="text-sm text-slate-500">
            {project._count.scripts} scripts
          </div>
          <div className="text-sm text-slate-500">
            {project._count.assets} assets
          </div>
          <Badge className={statusColors[project.status]}>
            {statusLabels[project.status]}
          </Badge>
          <div className="text-sm text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(project.updatedAt)}
          </div>
        </div>
      </div>
    </Link>
  );
}
