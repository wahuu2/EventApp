'use client';

import { createBooking } from '@/lib/actions/booking.actions';
import posthog from 'posthog-js';
import { useState } from 'react';

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ track in-flight state

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    const { success } = await createBooking({eventId, slug, email });

    if (success){
      setSubmitted(true);
      posthog.capture('event_booked', { eventId, slug })    }else{
      console.error('Booking creation failed');
      posthog.captureException('Booking creation failed')
    }
    e.preventDefault();
    if (isSubmitting) return; // ✅ guard against duplicate clicks
    setIsSubmitting(true);
    setError(null);

    try {
      // ✅ Call your backend API to persist the booking
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error('Failed to save booking');
      }

      setSubmitted(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false); // ✅ reset state
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email address"
              required
            />
          </div>

          <button
            type="submit"
            className="button-submit"
            disabled={isSubmitting} // ✅ disable while submitting
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default BookEvent;
