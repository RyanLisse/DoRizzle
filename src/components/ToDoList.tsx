"use client";
import { trpc } from "@/app/_trpc/client";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { EditIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { serverClient } from "@/app/_trpc/serverClient";

const formSchema = z.object({
  content: z.string().nonempty({ message: "Todo content is required." }),
});

export default function TodoList({
  initialTodos,
}: {
  initialTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>;
}) {
  const { data, refetch } = trpc.getTodos.useQuery(undefined, {
    initialData: initialTodos,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const addTodoMutation = trpc.addTodos.useMutation({
    onSettled: () => {
      refetch();
    },
  });
  const setDone = trpc.setDone.useMutation({
    onSettled: () => {
      refetch();
    },
  });
  const deleteTodo = trpc.deleteTodo.useMutation({
    onSettled: () => {
      refetch();
    },
  });
  const editTodo = trpc.editTodo.useMutation({
    onSettled: () => {
      refetch();
    },
  });

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await addTodoMutation.mutateAsync({
      content: values.content,
      createdAt: new Date().toISOString(),
      lastEdited: new Date().toISOString(),
      done: 0,
    });

    if (result) {
      toast({ title: "Todo added", description: values.content });
      form.reset();
    }
  }

  async function onRemove(id: number) {
    await deleteTodo.mutateAsync(id);
    toast({ title: "Todo removed", description: `Removed todo with id ${id}` });
  }

  async function onToggleDone(id: number, done: number) {
    console.log("Toggling done for:", id, done);
    await setDone.mutateAsync({
      id,
      done: done ? 0 : 1,
      lastEdited: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });
  }

  const [editingTodo, setEditingTodo] = useState<{
    id: number;
    content: string | null;
    done: number | null;
    createdAt: string | null;
  } | null>(null);

  function onEdit(id: number) {
    const todoToEdit = data?.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditingTodo({
        id: todoToEdit.id,
        content: todoToEdit.content || "",
        done: todoToEdit.done || 0,
        createdAt: todoToEdit.createdAt || new Date().toISOString(),
      });
    }
  }

  return (
    <div className="flex w-screen justify-center items-center h-screen">
      <div className="shadow-2xl rounded-lg p-6 container w-3/5 mx-auto transition-colors duration-500">
        <motion.h1
          className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-stone-950 to-stone-100 dark:bg-gradient-to-r dark:from-stone-50 dark:to-stone-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          DoRizzle
        </motion.h1>
        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A simple app to manage your tasks.
        </motion.p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2 ">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex-grow"
                    >
                      <FormControl>
                        <Input
                          type="text"
                          autoComplete="off"
                          placeholder="Write your Todo"
                          {...field}
                          className="w-full p-4 border-gray-300 dark:border-gray-600 transition-colors duration-500 "
                        />
                      </FormControl>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Button
                        type="submit"
                        className="bg-gray-950 dark:bg-stone-100 dark:text-stone-900 text-stone-100 transition-colors duration-500 hover:bg-stone-200 active:bg-stone-300 px-8 py-2 text-center"
                      >
                        Add Task
                      </Button>
                    </motion.div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <ul className="mt-4 space-y-4">
          {data
            ?.slice()
            .reverse()
            .map((todo, index) => (
              <motion.li
                key={todo.id}
                className="flex items-center space-x-4 mx-auto"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.span
                  className={`flex-1 ${
                    todo.done
                      ? "line-through text-gray-400 dark:text-gray-600"
                      : "text-gray-700 dark:text-gray-300"
                  } transition-colors duration-500`}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: todo.done ? 0.5 : 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    await onToggleDone(todo.id, todo.done ?? 0);
                  }}
                >
                  {editingTodo?.id === todo.id ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Input
                        type="text"
                        defaultValue={editingTodo.content || ""}
                        onBlur={async (e) => {
                          if (e.target.value) {
                            await editTodo.mutateAsync({
                              id: todo.id,
                              content: e.target.value,
                              lastEdited: new Date().toISOString(),
                              createdAt:
                                todo.createdAt || new Date().toISOString(),
                            });
                            setEditingTodo(null);
                            toast({
                              title: "Todo edited",
                              description: `Edited todo with id ${todo.id}`,
                            });
                          }
                        }}
                      />
                    </motion.div>
                  ) : (
                    todo.content
                  )}
                </motion.span>
                <span className="text-sm text-gray-500">
                  Last edited:
                  {new Date(
                    todo.lastEdited || todo.createdAt || "Date is not working"
                  ).toLocaleString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <button onClick={() => onEdit(todo.id)}>
                  <EditIcon className="h-5 w-5 text-gray-500" />
                </button>
                <button onClick={() => onRemove(todo.id)}>
                  <TrashIcon className="h-5 w-5 text-gray-500" />
                </button>
              </motion.li>
            ))}
        </ul>
      </div>
    </div>
  );
}
