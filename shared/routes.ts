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
  unauthorized: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    me: {
      method: 'GET' as const,
      path: '/api/me' as const,
      responses: {
        200: z.custom<typeof users.$inferSelect>().nullable(),
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/logout' as const,
      responses: {
        200: z.object({ success: z.boolean() }),
      },
    }
  },
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
  dashboard: {
    get: {
      method: 'GET' as const,
      path: '/api/dashboard' as const,
      responses: {
        200: z.object({
          user: z.custom<typeof users.$inferSelect>(),
          pet: z.custom<typeof pets.$inferSelect>().optional(),
          plan: z.custom<typeof plans.$inferSelect>().optional(),
          projectedGrowth: z.array(z.object({ year: z.string(), amount: z.number() })),
          careSuggestions: z.array(z.string()),
        }),
        401: errorSchemas.unauthorized,
      },
    },
  },
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
