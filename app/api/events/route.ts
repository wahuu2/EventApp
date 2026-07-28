import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/database/event.model";
import { v2 as cloudinary } from "cloudinary";

// Example: using a simple token check.
// You can replace this with NextAuth or any other auth system.
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

export async function POST(req: NextRequest) {
  // 🔒 Auth guard: block unauthorized callers
  if (!ADMIN_TOKEN) {
    console.error("ADMIN_TOKEN is not configured");
    return NextResponse.json({ message: "Server misconfigured" }, { status: 500 });
  }
  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const formData = await req.formData();
    const event = Object.fromEntries(formData.entries());

    // ✅ Get file from formData
    const file = formData.get("image");
    if (!file || typeof file === "string") {
      return NextResponse.json({ message: "Image file is required" }, { status: 400 });
    }

    const blobFile = file as Blob;
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (blobFile.size > MAX_SIZE) {
      return NextResponse.json({ message: "Image file too large" }, { status: 400 });
    }
    if (!blobFile.type?.startsWith("image/")) {
      return NextResponse.json({ message: "Uploaded file must be an image" }, { status: 400 });
    }

    let tags: string[];
    let agenda: string[];
    try {
      const rawTags = formData.get("tags");
      const rawAgenda = formData.get("agenda");
      if (typeof rawTags !== "string" || typeof rawAgenda !== "string") {
        throw new Error("Missing tags or agenda");
      }
      tags = JSON.parse(rawTags);
      agenda = JSON.parse(rawAgenda);
      if (!Array.isArray(tags) || !Array.isArray(agenda)) {
        throw new Error("Tags and agenda must be arrays");
      }
    } catch {
      return NextResponse.json({ message: "Invalid tags or agenda format" }, { status: 400 });
    }

    // ✅ Convert Blob to Buffer
    const arrayBuffer = await blobFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("Cloudinary upload timed out")), 15000);
      cloudinary.uploader
        .upload_stream({ resource_type: "image", folder: "DevEvent" }, (error, results) => {
          clearTimeout(timer);
          if (error) return reject(error);
          if (!results) return reject(new Error("Cloudinary upload returned no result"));
          resolve(results);
        })
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    let createdEvent;
    try {
      createdEvent = await Event.create({
        ...event,
        tags,
        agenda,
      });
    } catch (dbError) {
      const publicId = (uploadResult as { public_id?: string }).public_id;
      if (publicId) {
        await cloudinary.uploader.destroy(publicId).catch(() => {});
      }
      throw dbError;
    }

    return NextResponse.json(
      { message: "Event Created successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Event Creation Failed", error: e instanceof Error ? e.message : "Unknown" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ message: "Events fetched successfully", events }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Events fetched failed", error: e instanceof Error ? e.message : "Unknown" },
      { status: 500 }
    );
  }
}
