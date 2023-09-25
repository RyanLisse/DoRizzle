import { z } from "zod";
import { eq } from "drizzle-orm";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { publicProcedure, router } from "./trpc";
import * as schema from "@/app/db/schema";
import {todos} from "@/app/db/schema";
const sql = neon(process.env.DATABASE_URL!);
neonConfig.fetchConnectionCache = true;
const db = drizzle(sql, { schema });

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return db.select().from(todos).execute();
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
      await db.insert(todos).values(opts.input).execute();
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
      await db
        .update(todos)
        .set({
          done: opts.input.done,
          lastEdited: opts.input.lastEdited,
          createdAt: opts.input.createdAt,
        })
        .where(eq(todos.id, opts.input.id))
        .execute();
      return true;
    }),

  deleteTodo: publicProcedure.input(z.number()).mutation(async (opts) => {
    await db.delete(todos).where(eq(todos.id, opts.input)).execute();
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
      await db
        .update(todos)
        .set({
          content: opts.input.content,
          lastEdited: opts.input.lastEdited,
          createdAt: opts.input.createdAt,
        })
        .where(eq(todos.id, opts.input.id))
        .execute();
      return true;
    }),
});

// This type will be used as a reference later...
export type AppRouter = typeof appRouter;
