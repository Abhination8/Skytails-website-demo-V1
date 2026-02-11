import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.use(session({
    secret: process.env.SESSION_SECRET || "skytails-secret",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: { secure: false }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await storage.getUserByUsername(username);
    if (!user || user.password !== password) {
      return done(null, false);
    }
    return done(null, user);
  }));

  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  app.get(api.auth.me.path, (req, res) => {
    res.json(req.user || null);
  });

  app.post(api.auth.logout.path, (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ success: true });
    });
  });

  app.post(api.onboarding.submit.path, async (req, res) => {
    try {
      const input = api.onboarding.submit.input.parse(req.body);
      const user = await storage.createUserWithData({
        ...input.user,
        username: input.user.email,
      }, { ...input.pet, userId: 0 }, { ...input.plan, userId: 0 });
      
      req.login(user, (err) => {
        if (err) throw err;
        res.status(201).json({ success: true, userId: user.id });
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.dashboard.get.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.user as any;
    const pet = await storage.getPetByUserId(user.id);
    const plan = await storage.getPlanByUserId(user.id);

    res.json({
      user,
      pet,
      plan,
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
