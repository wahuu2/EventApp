import EventDetail from "@/components/EventDetail";
import { Suspense } from "react";

export default function EventDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        {/* ✅ unwrap params inside Suspense */}
        <EventDetailWrapper params={params} />
      </Suspense>
    </main>
  );
}

// ✅ A small async wrapper component
async function EventDetailWrapper({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <EventDetail slug={slug} />;
}
