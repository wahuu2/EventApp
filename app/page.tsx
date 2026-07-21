import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";

const events = [
  { image: "/images/event1.png", title: "Event 1" },
  { image: "/images/event2.png", title: "Event 2" },
];

const Home = () => {
  return (
    <section className="px-6 py-12">
      <h1 className="text-center text-3xl font-bold">
        The Hub for Every Dev <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5 text-gray-600">
        Hackathons, Meetups, and Conferences All in One Place
      </p>

      <div className="flex justify-center mt-8">
        <ExploreBtn />
      </div>

      <div className="mt-20 space-y-7">
        <h3 className="text-xl font-semibold">Featured Events</h3>
        <ul className="space-y-6">
          {events.map((event, index) => (
            <li key={index}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
