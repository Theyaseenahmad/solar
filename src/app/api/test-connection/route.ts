
import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test a simple query
    const result = await db.execute("SELECT 1");
    return NextResponse.json({ success: true });
  } catch (error : any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}