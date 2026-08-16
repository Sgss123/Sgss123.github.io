import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "World";

  // 模拟一些 Node.js 特定的处理
  const timestamp = new Date().toISOString();
  const nodeVersion = process.version;
  const platform = process.platform;

  return NextResponse.json({
    message: `Hello ${name} from Node.js!`,
    timestamp,
    nodeVersion,
    platform,
    runtime: "nodejs",
    features: [
      "Full Node.js API support",
      "File system access",
      "npm package ecosystem",
      "Database connections",
      "Complex business logic",
    ],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 模拟数据处理
    const processed = {
      ...body,
      processed: true,
      nodejs: true,
      timestamp: new Date().toISOString(),
      serverInfo: {
        nodeVersion: process.version,
        platform: process.platform,
        memoryUsage: process.memoryUsage(),
      },
    };

    return NextResponse.json(processed);
  } catch (_error) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
}
