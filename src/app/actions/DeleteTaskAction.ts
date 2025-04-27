"use server";

import prisma from "@/lib/prisma";
import { Task } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function DeleteTaskAction(id: number): Promise<Task> {
  try {
    const deletedTask = await prisma.task.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");

    return deletedTask;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}
