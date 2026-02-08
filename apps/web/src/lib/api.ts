// API client for uWrap backend
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://uwrap-api-production.up.railway.app';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.text();
      return { error: `API Error: ${response.status} - ${error}` };
    }

    const data = await response.json();
    return { data };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Network error' };
  }
}

// Projects API
export interface Project {
  id: string;
  name: string;
  description?: string;
  type: 'FILM' | 'COMMERCIAL' | 'DOCUMENTARY' | 'CORPORATE' | 'MUSIC_VIDEO' | 'OTHER';
  status: 'IDEA' | 'PRE_PRODUCTION' | 'PRODUCTION' | 'POST_PRODUCTION' | 'COMPLETED';
  startDate?: string;
  endDate?: string;
  budget?: number;
  createdAt: string;
  updatedAt: string;
}

export const projectsApi = {
  getAll: () => apiRequest<Project[]>('/api/projects'),
  getById: (id: string) => apiRequest<Project>(`/api/projects/${id}`),
  create: (data: Partial<Project>) => 
    apiRequest<Project>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Project>) =>
    apiRequest<Project>(`/api/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/api/projects/${id}`, {
      method: 'DELETE',
    }),
};

// Health check
export const healthApi = {
  check: () => apiRequest<{ status: string; timestamp: string }>('/api/health'),
};