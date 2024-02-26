import { prisma } from "@/lib/prismaClient";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const bodyParts = await prisma.bodyPart.findMany({
    include: { exercises: true },
  });
  return (
    <ul>
      {bodyParts.map((b) => {
        return (
          <li key={b.id}>
            {b.name}
            <ul>
              {b.exercises.map((e) => {
                return <li key={e.id}>{e.name}</li>;
              })}
            </ul>
          </li>
        );
      })}
      <Button>aaa</Button>
    </ul>
  );
}
