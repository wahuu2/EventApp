import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database/event.model";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Home = async () => {
  "use cache";
  cacheLife("hours");

  let events: IEvent[] = [];
  try {
    const response = await fetch(`${BASE_URL}/api/events`, {
      cache: "no-store", // ✅ ensures fresh data from MongoDB
    });
    if (response.ok) {
      const data = await response.json();
      events = data.events; // ✅ use the events returned by your API
    }
  } catch (error) {
    console.error("Failed to load events", error);
  }

  return (
    <section className="px-6 py-12">
      {/* Hero Section */}
      <header className="text-center">
        <h1 className="text-3xl font-bold leading-tight">
          The Hub for Every Dev <br /> Event You Can&apos;t Miss
        </h1>
        <p className="mt-5 text-gray-600">
          Hackathons, Meetups, and Conferences All in One Place
        </p>
        <div className="flex justify-center mt-8">
          <ExploreBtn />
        </div>
      </header>

      {/* Featured Events */}
      <div className="mt-20 space-y-7">
        <h3 className="text-xl font-semibold">Featured Events</h3>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events && events.length > 0 ? (
            events.map((event: IEvent) => (
              <li key={event.slug} className="list-none">
                <EventCard {...event} />
              </li>
            ))
          ) : (
            <p className="text-gray-500">No events found.</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Home;
