import { prisma } from "@/lib/prismaClient";
import { Form } from "./components/Form";

export default async function Page() {
  const bodyPartsWithExercise = await prisma.bodyPart.findMany({
    include: { exercises: true },
  });

  return <Form bodyPartsWithExercise={bodyPartsWithExercise}  />;
}
