import { z } from 'zod';

// ============================================
// USER SCHEMAS
// ============================================

export const userRoleSchema = z.enum(['OWNER', 'ADMIN', 'MEMBER', 'VIEWER']);

// ============================================
// ORGANIZATION SCHEMAS
// ============================================

export const createOrganizationSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
});

export const updateOrganizationSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  logo: z.string().url().nullable().optional(),
  settings: z.object({
    defaultTimezone: z.string().optional(),
    dateFormat: z.string().optional(),
    theme: z.enum(['light', 'dark', 'system']).optional(),
  }).optional(),
});

// ============================================
// PROJECT SCHEMAS
// ============================================

export const projectStatusSchema = z.enum([
  'IDEA',
  'PRE_PRODUCTION',
  'PRODUCTION',
  'POST_PRODUCTION',
  'COMPLETED',
  'ARCHIVED',
]);

export const createProjectSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(5000).nullable().optional(),
  status: projectStatusSchema.default('IDEA'),
  coverImage: z.string().url().nullable().optional(),
  startDate: z.string().datetime().nullable().optional(),
  endDate: z.string().datetime().nullable().optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).nullable().optional(),
  status: projectStatusSchema.optional(),
  coverImage: z.string().url().nullable().optional(),
  startDate: z.string().datetime().nullable().optional(),
  endDate: z.string().datetime().nullable().optional(),
});

export const inviteProjectMemberSchema = z.object({
  email: z.string().email(),
  role: userRoleSchema.default('MEMBER'),
});

// ============================================
// SCRIPT SCHEMAS
// ============================================

export const createScriptSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().default(''),
});

export const updateScriptSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().optional(),
});

export const createScriptVersionSchema = z.object({
  changeDescription: z.string().max(500).nullable().optional(),
});

export const createScriptCommentSchema = z.object({
  content: z.string().min(1).max(5000),
  fromPosition: z.number().int().min(0).nullable().optional(),
  toPosition: z.number().int().min(0).nullable().optional(),
  parentId: z.string().uuid().nullable().optional(),
});

// ============================================
// SHOOTING DAY SCHEMAS
// ============================================

export const shootingDayStatusSchema = z.enum([
  'PLANNED',
  'CONFIRMED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
]);

export const createShootingDaySchema = z.object({
  date: z.string().datetime(),
  title: z.string().min(1).max(200),
  description: z.string().max(5000).nullable().optional(),
  location: z.string().max(500).nullable().optional(),
  callTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).nullable().optional(),
  wrapTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).nullable().optional(),
  status: shootingDayStatusSchema.default('PLANNED'),
});

export const updateShootingDaySchema = z.object({
  date: z.string().datetime().optional(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).nullable().optional(),
  location: z.string().max(500).nullable().optional(),
  callTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).nullable().optional(),
  wrapTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).nullable().optional(),
  status: shootingDayStatusSchema.optional(),
  order: z.number().int().min(0).optional(),
});

export const reorderShootingDaysSchema = z.object({
  items: z.array(z.object({
    id: z.string().uuid(),
    order: z.number().int().min(0),
  })),
});

// ============================================
// CALL SHEET SCHEMAS
// ============================================

export const generateCallSheetSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  generalCallTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  weatherNotes: z.string().max(2000).nullable().optional(),
  parkingNotes: z.string().max(2000).nullable().optional(),
  hospitalInfo: z.string().max(2000).nullable().optional(),
  emergencyContact: z.string().max(500).nullable().optional(),
  cast: z.array(z.object({
    name: z.string().min(1),
    character: z.string().min(1),
    callTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    notes: z.string().nullable().optional(),
  })).optional(),
  crew: z.array(z.object({
    name: z.string().min(1),
    role: z.string().min(1),
    department: z.string().min(1),
    callTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    notes: z.string().nullable().optional(),
  })).optional(),
});

// ============================================
// ASSET SCHEMAS
// ============================================

export const assetTypeSchema = z.enum(['IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT', 'OTHER']);

export const createAssetSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(5000).nullable().optional(),
  type: assetTypeSchema,
  tags: z.array(z.string().max(50)).default([]),
});

export const updateAssetSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).nullable().optional(),
  tags: z.array(z.string().max(50)).optional(),
});

// ============================================
// VALIDATION HELPERS
// ============================================

export function validate<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}
