import { prisma } from "@/lib/prismaClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const exerciseRecords = await prisma.exerciseRecord.findMany({
    include: {
      exercise: true,
    },
    orderBy: {
      exercisedAt: "asc",
    },
  });

  return (
    <ul className="flex flex-col gap-5">
      {exerciseRecords.map((r) => {
        return (
          <Card key={r.id}>
            <CardHeader>
              <CardTitle>{r.exercise.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {r.time && (
                <p>
                  {r.weight && `${r.weight}kg`} {r.time}回*{r.rep}
                </p>
              )}
              {r.min && (
                <p>
                  {r.min}min*{r.rep}
                </p>
              )}
            </CardContent>
            <CardFooter>{r.exercisedAt.toString()}</CardFooter>
          </Card>
        );
      })}
    </ul>
  );
}
