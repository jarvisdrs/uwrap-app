import { LoadingGrid } from '@/components/loading';

export default function ProjectsLoading() {
  return (
    <div className="p-6">
      <div className="h-8 w-48 bg-purple-950/30 rounded animate-pulse mb-6" />
      <LoadingGrid count={6} />
    </div>
  );
}
