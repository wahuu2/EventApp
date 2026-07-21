import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/constants";

const Home = () => {
  return (
    <section className="px-6 py-12">
      {/* Hero Section */}
      <header className="text-center">
        <h1 className="text-3xl font-bold leading-tight">
          The Hub for Every Dev <br /> Event You Can't Miss
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
          {events.map((event) => (
            <li key={event.slug}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
