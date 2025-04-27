"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function ToggleTaskCompletedAction(id: number, completed: boolean) {
  try {
    if (id) {
      await prisma.task.update({
        where: { id: Number(id) },
        data: { completed },
      });

      revalidatePath("/");
    }
  } catch (error) {
    console.error("Database error:", error);
  }
}

export default ToggleTaskCompletedAction;
