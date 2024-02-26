import { prisma } from "@/lib/prismaClient";

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
    </ul>
  );
}
