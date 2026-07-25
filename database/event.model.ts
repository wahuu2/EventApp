import mongoose, { Schema, Document, Model } from "mongoose";
import slugify from "slugify";

// Strongly typed Event interface
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;   // stored in ISO format
  time: string;   // stored in HH:mm format
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Define schema
const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    image: { type: String, required: true },
    venue: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String, required: true },
    audience: { type: String, required: true },
    agenda: { type: [String], required: true  },
    organizer: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true }
);

// Async pre-save hook for slug + date/time normalization
EventSchema.pre<IEvent>("save", async function () {
  // Generate slug only if title changed
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // Normalize date to YYYY-MM-DD without timezone issues
if (this.isModified("date")) {
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  if (!dateRegex.test(this.date)) {
    throw new Error("Invalid date format, expected YYYY-MM-DD");
  }
  // Keep the value as-is since it's already normalized
  this.date = this.date;
}


  // Normalize time to HH:mm
  if (this.isModified("time")) {
    const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(this.time)) {
      throw new Error("Invalid time format, expected HH:mm");
    }
  }
});

// Unique index on slug
EventSchema.index({ slug: 1 }, { unique: true });

export const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
