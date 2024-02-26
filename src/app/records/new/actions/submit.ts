"use server";

import { prisma } from "@/lib/prismaClient";
import z from "zod";
import { revalidatePath } from "next/cache";

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
    rep: z.preprocess((v) => Number(v), z.number()),
    exercisedAt: z.preprocess((v) => new Date(v as string), z.date()),
  };

  const parsed = z.object(schema).safeParse(Object.fromEntries(formData));

  console.log(parsed);

  if (!parsed.success) {
    console.log(parsed.error.errors);
    // return { validatedErrors: parsed.error.flatten().fieldErrors };
    return;
  }

  console.log(parsed);

  const created = await prisma.exerciseRecord.create({
    data: parsed.data,
  });

  revalidatePath("/");

  return;
};
