const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ShortenResponse {
  success: boolean;
  message: string;
  data: {
    url: {
      id: string;
      fullUrl: string;
      shortId: string;
      shortUrl: string;
      createdAt: string;
    };
    qrCode: string;
  };
}

interface AnalyticsResponse {
  success: boolean;
  message: string;
  data: {
    rawLogs: Array<{
      id: string;
      ip: string;
      userAgent: string;
      createdAt: string;
    }>;
    chartData: Array<{ date: string; _count: { id: number } }>;
  };
}

export async function shortenUrl(
  url: string,
): Promise<ShortenResponse["data"]> {
  const response = await fetch(`${API_BASE_URL}/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullUrl: url }),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Failed to shorten URL" }));
    throw new Error(error.message || "Failed to shorten URL");
  }

  const result: ShortenResponse = await response.json();
  return result.data;
}

export async function getAnalytics(
  shortId: string,
): Promise<AnalyticsResponse["data"]> {
  const response = await fetch(`${API_BASE_URL}/analytics/${shortId}`);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Failed to fetch analytics" }));
    throw new Error(error.message || "Failed to fetch analytics");
  }

  const result: AnalyticsResponse = await response.json();
  return result.data;
}

export async function getQrCode(shortId: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/qr/${shortId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch QR code");
  }

  const data = await response.json();
  return data.qrCode;
}

export function getFullUrl(shortId: string): string {
  return `${API_BASE_URL}/${shortId}`;
}
