import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.onboarding.submit.path, async (req, res) => {
    try {
      const input = api.onboarding.submit.input.parse(req.body);
      const user = await storage.createUserWithData(input.user, input.pet, input.plan);
      res.status(201).json({ success: true, userId: user.id });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      // For prototype, just log and return 500
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.mock.dashboard.path, (_req, res) => {
    res.json({
      projectedGrowth: [
        { year: '2024', amount: 1200 },
        { year: '2025', amount: 2600 },
        { year: '2026', amount: 4200 },
        { year: '2027', amount: 6100 },
      ],
      careSuggestions: [
        "Annual Dental Cleaning",
        "Vaccine Booster (Distemper)",
        "Wellness Exam"
      ]
    });
  });

  return httpServer;
}
