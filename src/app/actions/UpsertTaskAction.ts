"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Task } from "@prisma/client";

export default async function UpsertTodoAction(
  id: number | undefined,
  title: string,
  description: string | undefined,
  priority: number
): Promise<Task> {
  if (!title) throw new Error("Title is required");

  let task: Task;
  if (typeof id === "number") {
    task = await prisma.task.update({
      where: { id },
      data: { title, description: description ?? null, priority },
    });
  } else {
    task = await prisma.task.create({
      data: {
        title,
        description: description ?? null,
        priority,
        completed: false,
      },
    });
  }

  revalidatePath("/");
  return task;
}
