import { z } from 'zod';
import { insertUserSchema, insertPetSchema, insertPlanSchema, users, pets, plans } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  // We'll primarily use client-side state for the prototype as requested,
  // but these endpoints enable persistence if we want to save the final result.
  onboarding: {
    submit: {
      method: 'POST' as const,
      path: '/api/onboarding' as const,
      input: z.object({
        user: insertUserSchema,
        pet: insertPetSchema.omit({ userId: true }),
        plan: insertPlanSchema.omit({ userId: true }),
      }),
      responses: {
        201: z.object({ success: z.boolean(), userId: z.number() }),
        400: errorSchemas.validation,
      },
    },
  },
  // Basic health check or mock data endpoints
  mock: {
    dashboard: {
      method: 'GET' as const,
      path: '/api/mock/dashboard' as const,
      responses: {
        200: z.object({
          projectedGrowth: z.array(z.object({ year: z.string(), amount: z.number() })),
          careSuggestions: z.array(z.string()),
        }),
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
