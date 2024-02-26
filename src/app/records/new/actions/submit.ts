"use server";

import { prisma } from "@/lib/prismaClient";
import z from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export const submit = async (state: void, formData: FormData) => {
  console.log(formData);
  const schema = {
    exerciseId: z.preprocess((v) => Number(v), z.number()),
    weight: z.preprocess(
      (v) => (v ? Number(v) : undefined),
      z.number().optional()
    ),
    time: z.preprocess(
      (v) => (v ? Number(v) : undefined),
      z.number().optional()
    ),
    min: z.preprocess(
      (v) => (v ? Number(v) : undefined),
      z.number().optional()
    ),
    rep: z.preprocess((v) => Number(v), z.number()),
    exercisedAt: z.preprocess((v) => new Date(v as string), z.date()),
  };

  const parsed = z.object(schema).safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    // return { validatedErrors: parsed.error.flatten().fieldErrors };
    return;
  }

  await prisma.exerciseRecord.create({
    data: parsed.data,
  });

  revalidatePath("/");
  redirect("/");
};
