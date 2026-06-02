import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, email, pickupLocation, dropLocation, goodsType, subject, message, formType } = body;

    if (!fullName || !phone) {
      return Response.json({ error: "Name and phone are required" }, { status: 400 });
    }

    await db.insert(inquiries).values({
      fullName,
      phone,
      email: email || null,
      pickupLocation: pickupLocation || null,
      dropLocation: dropLocation || null,
      goodsType: goodsType || null,
      subject: subject || null,
      message: message || null,
      formType: formType || "quote",
    });

    return Response.json({ success: true, message: "Inquiry submitted successfully" });
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return Response.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
