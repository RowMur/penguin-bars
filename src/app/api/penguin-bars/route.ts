import { flavours } from "@/lib/flavours";
import { prisma } from "@/lib/db";
import { shops } from "@/lib/shops";
import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const requestStore = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestStore.get(ip) ?? [];
  const recent = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestStore.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestStore.set(ip, recent);
  return false;
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (!origin || !host) {
    return false;
  }

  const protocol = request.headers.get("x-forwarded-proto") ?? "https";
  const expectedOrigin = `${protocol}://${host}`;
  return origin === expectedOrigin;
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 415 },
      );
    }

    if (!isSameOrigin(request)) {
      return NextResponse.json(
        { error: "Invalid request origin" },
        { status: 403 },
      );
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait and try again." },
        { status: 429 },
      );
    }

    const body = await request.json();

    const { joke, fact, design, county, shop, imageUrl, website } = body;
    const flavour = body.flavour ?? body.flavor;

    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 },
      );
    }

    if (!joke || !flavour || !county || !shop) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (!shops.includes(shop)) {
      return NextResponse.json(
        { error: "Please select a valid shop" },
        { status: 400 },
      );
    }

    if (!flavours.includes(flavour)) {
      return NextResponse.json(
        { error: "Please select a valid flavour" },
        { status: 400 },
      );
    }

    const penguinBar = await prisma.penguinBar.create({
      data: {
        joke,
        fact: typeof fact === "string" ? fact : "",
        design: typeof design === "string" ? design : "",
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
