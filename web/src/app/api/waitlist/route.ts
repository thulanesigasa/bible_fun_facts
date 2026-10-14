import { handleWaitlist } from "@/lib/waitlist";
export const runtime = "nodejs";
export const maxDuration = 15;
export async function POST(request: Request) {
  return handleWaitlist(request);
}
