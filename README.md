# 📝 ToDo App

This application is a simple ToDo management system built with a modern tech stack. It allows users to add, edit, and delete tasks, and mark them as done.

## 🏗️ Architecture & Tech Stack

The application is built using the following technologies:

- **Next.js**: A React framework for building modern web applications. It provides features like server-side rendering and static site generation. The version used in this project is 13.5.2.

- **TypeScript**: A statically typed superset of JavaScript that adds types to the language. It helps to write safer and more predictable code.

- **tRPC**: A framework for building typesafe APIs. It is used to define the API endpoints for the application.

- **TanStack React Query**: A library for fetching, caching, synchronizing, and updating server state in React applications. It is used in conjunction with tRPC to fetch and mutate data.

- **Shadcn**: A UI library for building modern and responsive user interfaces. It is used to define the UI components of the application.

- **Drizzle ORM**: An Object-Relational Mapping (ORM) library for Node.js. It is used to interact with the SQLite database.

- **Zod**: A library for defining and validating schemas. It is used to validate the input data for the API endpoints.

- **React Hook Form**: A library for managing form state in React applications. It is used in conjunction with Zod to handle form validation.

- **SQLite**: A lightweight disk-based database that doesn’t require a separate server process. It's used for storing the ToDo items.

![ToDo App Architecture](https://imgr.whimsical.com/thumbnails/ErtxMXRcpK66G3p13j2jEW/PtaiAZ7ZX6hY6idvnWxVgA)

[View or edit this diagram in Whimsical.](https://whimsical.com/todo-app-architecture-ErtxMXRcpK66G3p13j2jEW?ref=chatgpt)

## 📂 Application Structure

The application is structured as follows:

- The `src/server/index.ts` file defines the API endpoints for the application using tRPC and Drizzle ORM. It includes endpoints for getting all todos, adding a todo, setting a todo as done, deleting a todo, and editing a todo.

- The `src/app/_trpc/client.ts` file creates a tRPC client that is used to interact with the API endpoints.

- The `src/components/ToDoList.tsx` file defines the main UI of the application. It uses the tRPC client to fetch and mutate data, and React Hook Form to handle form state.

- The `src/app/db/schema.ts` file defines the schema for the todos table in the SQLite database.

- The `src/app/page.tsx` file is the main entry point of the application. It renders the ToDoList component.

- The `src/app/_trpc/Provider.tsx` file sets up the tRPC provider and the React Query client.

- The `src/app/api/trpc/[trpc]/route.ts` file sets up the tRPC server.

- The `drizzle` directory contains the database migrations and the Drizzle ORM configuration.

- The `tailwind.config.ts` file contains the configuration for Tailwind CSS, a utility-first CSS framework used for styling the application.

## 🖥️ Server-Side Code

The server-side code for the application is primarily located in the src/server/index.ts file. This file is responsible for defining the API endpoints that the client-side code interacts with. The API endpoints are defined using the tRPC framework, which allows for the creation of type-safe APIs.

Each endpoint corresponds to a specific operation that can be performed on the ToDo items in the application. These operations include fetching all ToDo items, adding a new ToDo item, marking a ToDo item as done, deleting a ToDo item, and editing a ToDo item.

The interaction with the SQLite database is managed using the Drizzle ORM. This library provides a set of methods for performing database operations in a way that is safe and efficient. For example, the getTodos endpoint uses the db.select().from(todos).all() command to fetch all ToDo items from the database.

## 🖱️ Client-Side Code

The client-side code for the application is primarily located in the src/components/ToDoList.tsx file. This file defines the main UI of the application and is responsible for interacting with the API endpoints defined in the server-side code.

The interaction with the API endpoints is managed using a tRPC client, which is created in the src/app/\_trpc/client.ts file. The tRPC client provides a set of methods for sending requests to the API endpoints and handling the responses.

The state of the form used to add new ToDo items is managed using the React Hook Form library. This library provides a set of hooks that make it easy to manage form state in a React application. For example, the useForm hook is used to create a form instance that can be used to get the current form values, check if the form is valid, and perform other form-related operations.

The form data is validated using the Zod library before it is sent to the server. This ensures that the data conforms to the expected format and helps to prevent errors.

## 📜 Drizzle ORM Commands

Drizzle ORM provides a set of commands for managing the database. For example, to generate SQLite migrations, you can use the following command:

```bash
pnpm drizzle-kit generate:sqlite
```

## 🚀 Running the Application

To run the application, use the `npm run dev` command. This will start the Next.js development server. You can then open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🌐 Deployment

The application can be deployed using Vercel, a platform for deploying Next.js applications. You can find more information about deploying Next.js applications in the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

##🎉 Conclusion

This application demonstrates how to build a modern web application using Next.js, TypeScript, tRPC, TanStack React Query, ShadcnUi, Drizzle ORM, Zod, and React Hook Form. It provides a good starting point for building your own applications with these technologies.
