"use server";

import prisma from "@/lib/prisma";

export interface PriorityCounts {
  high: number;
  medium: number;
  low: number;
}

export default async function GetPriorityCountsAction(): Promise<PriorityCounts> {
  const [high, medium, low] = await Promise.all([
    prisma.task.count({ where: { priority: 1 } }),
    prisma.task.count({ where: { priority: 2 } }),
    prisma.task.count({ where: { priority: 3 } }),
  ]);
  return { high, medium, low };
}
