"use server";

import prisma from "@/lib/prisma";
import { Task } from "@prisma/client";

export default async function GetTodosAction(): Promise<Task[]> {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: [
        {
          completed: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return tasks;
  } catch (error) {
    console.error("Failed to fetch todos from DB:", error);
    return [];
  }
}
