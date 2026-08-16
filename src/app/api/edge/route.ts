import { type NextRequest, NextResponse } from "next/server";

// 指定使用 Edge Runtime
export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "World";

  // Edge Runtime 特性
  const timestamp = new Date().toISOString();
  const userAgent = request.headers.get("user-agent") || "Unknown";
  const acceptLanguage = request.headers.get("accept-language") || "Unknown";

  // 注意：Edge Runtime 中无法访问 process 对象
  return NextResponse.json({
    message: `Hello ${name} from Edge Runtime!`,
    timestamp,
    userAgent,
    acceptLanguage,
    runtime: "edge",
    features: [
      "Global edge deployment",
      "Ultra-low latency",
      "Instant cold start",
      "Web APIs support",
      "Geolocation data",
    ],
    limitations: [
      "No Node.js specific APIs",
      "No file system access",
      "Limited package support",
      "No long-running tasks",
    ],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Edge Runtime 中的轻量级处理
    const processed = {
      ...body,
      processed: true,
      edge: true,
      timestamp: new Date().toISOString(),
      edgeFeatures: {
        global: true,
        lowLatency: true,
        instantStart: true,
      },
    };

    return NextResponse.json(processed);
  } catch (_error) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
}
