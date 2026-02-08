import { NotFound } from '@/components/error-boundary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Pagina non trovata',
};

export default function NotFoundPage() {
  return <NotFound />;
}
