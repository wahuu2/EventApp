'use server';
import { Event } from "@/database/event.model";
import { connectToDatabase } from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectToDatabase();

    const event = await Event.findOne({ slug });

    if (!event) {
      return []; // no event found, return empty array
    }

    return await Event.find({
  _id: { $ne: event._id },
  tags: { $in: event.tags }
})
.lean()
.then(events =>
  events.map(ev => ({
    ...ev,
    _id: ev._id.toString(),
  }))
);

  } catch (error) {
    console.error(error);
    return [];
  }
};
