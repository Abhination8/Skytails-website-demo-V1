import { db } from "./db";
import { users, pets, plans, type User, type InsertUser, type InsertPet, type InsertPlan } from "@shared/schema";
import { eq } from "drizzle-orm";
import session from "express-session";
import MemoryStore from "memorystore";

const SessionStore = MemoryStore(session);

export interface IStorage {
  sessionStore: session.Store;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUserWithData(user: InsertUser, pet: InsertPet, plan: InsertPlan): Promise<User>;
  getPetByUserId(userId: number): Promise<Pet | undefined>;
  getPlanByUserId(userId: number): Promise<Plan | undefined>;
}

export class DatabaseStorage implements IStorage {
  public sessionStore: session.Store;

  constructor() {
    this.sessionStore = new SessionStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUserWithData(user: InsertUser, pet: InsertPet, plan: InsertPlan): Promise<User> {
    return await db.transaction(async (tx) => {
      const [newUser] = await tx.insert(users).values(user).returning();
      
      await tx.insert(pets).values({ ...pet, userId: newUser.id });
      await tx.insert(plans).values({ ...plan, userId: newUser.id });
      
      return newUser;
    });
  }

  async getPetByUserId(userId: number): Promise<Pet | undefined> {
    const [pet] = await db.select().from(pets).where(eq(pets.userId, userId));
    return pet;
  }

  async getPlanByUserId(userId: number): Promise<Plan | undefined> {
    const [plan] = await db.select().from(plans).where(eq(plans.userId, userId));
    return plan;
  }
}

export const storage = new DatabaseStorage();
