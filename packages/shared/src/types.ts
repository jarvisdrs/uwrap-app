// ============================================
// USER & AUTH TYPES
// ============================================

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithOrganizations extends User {
  organizations: OrganizationMember[];
}

export type UserRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';

// ============================================
// ORGANIZATION TYPES
// ============================================

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  settings: OrganizationSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationSettings {
  defaultTimezone: string;
  dateFormat: string;
  theme: 'light' | 'dark' | 'system';
}

export interface OrganizationMember {
  id: string;
  userId: string;
  organizationId: string;
  role: UserRole;
  joinedAt: Date;
  user?: User;
}

// ============================================
// PROJECT TYPES
// ============================================

export type ProjectStatus = 'IDEA' | 'PRE_PRODUCTION' | 'PRODUCTION' | 'POST_PRODUCTION' | 'COMPLETED' | 'ARCHIVED';

export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  coverImage: string | null;
  startDate: Date | null;
  endDate: Date | null;
  organizationId: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectWithRelations extends Project {
  organization: Organization;
  createdBy: User;
  members: ProjectMember[];
  scripts: Script[];
  shootingDays: ShootingDay[];
  assets: Asset[];
}

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  role: UserRole;
  joinedAt: Date;
  user?: User;
}

// ============================================
// SCRIPT TYPES
// ============================================

export interface Script {
  id: string;
  projectId: string;
  title: string;
  content: string;
  version: number;
  isLocked: boolean;
  lockedById: string | null;
  lockedAt: Date | null;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScriptVersion {
  id: string;
  scriptId: string;
  version: number;
  title: string;
  content: string;
  changeDescription: string | null;
  createdById: string;
  createdAt: Date;
}

export interface ScriptComment {
  id: string;
  scriptId: string;
  userId: string;
  content: string;
  fromPosition: number | null;
  toPosition: number | null;
  resolved: boolean;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  replies?: ScriptComment[];
}

// ============================================
// SHOOTING SCHEDULE TYPES
// ============================================

export type ShootingDayStatus = 'PLANNED' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface ShootingDay {
  id: string;
  projectId: string;
  date: Date;
  title: string;
  description: string | null;
  location: string | null;
  callTime: string | null;
  wrapTime: string | null;
  status: ShootingDayStatus;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShootingScene {
  id: string;
  shootingDayId: string;
  sceneNumber: string;
  description: string;
  location: string | null;
  cast: string[];
  props: string[];
  estimatedDuration: number;
  order: number;
  completed: boolean;
  notes: string | null;
}

// ============================================
// CALL SHEET TYPES
// ============================================

export interface CallSheet {
  id: string;
  shootingDayId: string;
  version: number;
  title: string;
  generalCallTime: string;
  weatherNotes: string | null;
  parkingNotes: string | null;
  hospitalInfo: string | null;
  emergencyContact: string | null;
  generatedAt: Date;
  createdById: string;
  pdfUrl: string | null;
}

export interface CallSheetCast {
  id: string;
  callSheetId: string;
  name: string;
  character: string;
  callTime: string;
  notes: string | null;
}

export interface CallSheetCrew {
  id: string;
  callSheetId: string;
  name: string;
  role: string;
  department: string;
  callTime: string;
  notes: string | null;
}

// ============================================
// ASSET TYPES
// ============================================

export type AssetType = 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT' | 'OTHER';

export interface Asset {
  id: string;
  projectId: string;
  name: string;
  description: string | null;
  type: AssetType;
  url: string;
  thumbnailUrl: string | null;
  size: number;
  mimeType: string;
  metadata: Record<string, unknown> | null;
  tags: string[];
  uploadedById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AssetFolder {
  id: string;
  projectId: string;
  name: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export type NotificationType = 
  | 'PROJECT_CREATED'
  | 'PROJECT_UPDATED'
  | 'PROJECT_INVITE'
  | 'SCRIPT_COMMENT'
  | 'SCRIPT_LOCKED'
  | 'SHOOTING_DAY_UPDATED'
  | 'ASSET_UPLOADED'
  | 'CALL_SHEET_GENERATED';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  read: boolean;
  createdAt: Date;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
