import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { toolId, category, timestamp } = body;

    if (!toolId || !category || !timestamp) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const clicksFilePath = path.join(process.cwd(), "data", "clicks.json");

    let clicks = [];
    try {
      const fileContent = fs.readFileSync(clicksFilePath, "utf-8");
      clicks = JSON.parse(fileContent);
    } catch (e) {
      // File doesn't exist or is empty, start fresh
      clicks = [];
    }

    clicks.push({ toolId, category, timestamp });

    fs.writeFileSync(clicksFilePath, JSON.stringify(clicks, null, 2));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error tracking click:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
