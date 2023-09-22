import { z } from "zod";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { publicProcedure, router } from "./trpc";
import { todos } from "@/app/db/schema";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: "drizzle" });
export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return db.select().from(todos).all();
  }),

  addTodos: publicProcedure
    .input(
      z.object({
        content: z.string(),
        createdAt: z.string(),
        lastEdited: z.string(),
        done: z.number(),
      })
    )
    .mutation(async (opts) => {
        db.insert(todos).values(opts.input).run();
      return true;
    }),

  setDone: publicProcedure
    .input(
      z.object({
        id: z.number(),
        done: z.number(),
        lastEdited: z.string(),
        createdAt: z.string(),
      })
    )
    .mutation(async (opts) => {
        db
            .update(todos)
            .set({
                done: opts.input.done,
                lastEdited: opts.input.lastEdited,
                createdAt: opts.input.createdAt,
            })
            .where(eq(todos.id, opts.input.id))
            .run();
      return true;
    }),

  deleteTodo: publicProcedure.input(z.number()).mutation(async (opts) => {
      db.delete(todos).where(eq(todos.id, opts.input)).run();
    return true;
  }),

  editTodo: publicProcedure
    .input(
      z.object({
        id: z.number(),
        content: z.string(),
        lastEdited: z.string(),
        createdAt: z.string(),
      })
    )
    .mutation(async (opts) => {
        db
            .update(todos)
            .set({
                content: opts.input.content,
                lastEdited: opts.input.lastEdited,
                createdAt: opts.input.createdAt,
            })
            .where(eq(todos.id, opts.input.id))
            .run();
      return true;
    }),
});

// This type will be used as a reference later...
export type AppRouter = typeof appRouter;
