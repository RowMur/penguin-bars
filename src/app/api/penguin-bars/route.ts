import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { joke, fact, design, county, shop, imageUrl } = body;
    const flavour = body.flavour ?? body.flavor;

    if (!joke || !fact || !design || !flavour || !county || !shop) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const penguinBar = await prisma.penguinBar.create({
      data: {
        joke,
        fact,
        design,
        flavour,
        county,
        shop,
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(penguinBar, { status: 201 });
  } catch (error) {
    console.error("Error creating penguin bar:", error);
    return NextResponse.json(
      { error: "Failed to create penguin bar" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const penguinBars = await prisma.penguinBar.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(penguinBars);
  } catch (error) {
    console.error("Error fetching penguin bars:", error);
    return NextResponse.json(
      { error: "Failed to fetch penguin bars" },
      { status: 500 },
    );
  }
}
