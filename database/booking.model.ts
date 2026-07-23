import mongoose, { Schema, Document, Model } from "mongoose";
import { Event } from "./event.model";

// Strongly typed Booking interface
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define schema
const BookingSchema = new Schema<IBooking>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    email: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Index for faster queries on eventId
BookingSchema.index({ eventId: 1 });

// Pre-save hook: validate eventId and email
BookingSchema.pre<IBooking>("save", async function () {
  // Validate referenced Event exists
  const eventExists = await Event.exists({ _id: this.eventId });
  if (!eventExists) {
    throw new Error("Referenced event does not exist");
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    throw new Error("Invalid email format");
  }
});

export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
