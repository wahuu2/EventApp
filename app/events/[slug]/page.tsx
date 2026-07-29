import EventDetail from "@/components/EventDetail";
import { Suspense } from "react";

export default function EventDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetailWrapper params={params} />
      </Suspense>
    </main>
  );
}

// Async wrapper component
async function EventDetailWrapper({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <EventDetail slug={slug} />;
}
