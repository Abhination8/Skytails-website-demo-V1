import { db } from "./db";
import { users, pets, plans, type User, type InsertUser, type InsertPet, type InsertPlan } from "@shared/schema";

export interface IStorage {
  createUserWithData(user: InsertUser, pet: InsertPet, plan: InsertPlan): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  async createUserWithData(user: InsertUser, pet: InsertPet, plan: InsertPlan): Promise<User> {
    return await db.transaction(async (tx) => {
      const [newUser] = await tx.insert(users).values(user).returning();
      
      await tx.insert(pets).values({ ...pet, userId: newUser.id });
      await tx.insert(plans).values({ ...plan, userId: newUser.id });
      
      return newUser;
    });
  }
}

export const storage = new DatabaseStorage();
