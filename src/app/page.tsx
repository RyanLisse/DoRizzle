import React from "react";
import TodoList from "../components/ToDoList";
import { serverClient } from "./_trpc/serverClient";

const Home = async () => {
  const todos = await serverClient.getTodos();
  return (
    <div className="mx-auto flex flex-col min-h-full justify-center items-center">
      <TodoList initialTodos={todos} />
    </div>
  );
};

export default Home;
