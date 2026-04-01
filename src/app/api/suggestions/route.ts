import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [jokeRecords, factRecords, designRecords] = await Promise.all([
      prisma.penguinBar.findMany({
        select: { joke: true },
        distinct: ["joke"],
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
      prisma.penguinBar.findMany({
        select: { fact: true },
        distinct: ["fact"],
        where: { fact: { not: "" } },
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
      prisma.penguinBar.findMany({
        select: { design: true },
        distinct: ["design"],
        where: { design: { not: "" } },
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
    ]);

    const jokes = jokeRecords.map((r) => r.joke).filter(Boolean);
    const facts = factRecords.map((r) => r.fact).filter(Boolean);
    const designs = designRecords.map((r) => r.design).filter(Boolean);

    return NextResponse.json({ jokes, facts, designs });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 },
    );
  }
}
