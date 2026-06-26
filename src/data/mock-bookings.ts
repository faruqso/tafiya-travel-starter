export type BookingStatus = 'confirmed' | 'check-in' | 'completed' | 'cancelled';

export type MockBooking = {
  id: string;
  reference: string;
  title: string;
  destination: string;
  image: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  total: string;
  travelers: number;
  segments: Array<{
    type: 'flight' | 'hotel' | 'activity';
    label: string;
    detail: string;
  }>;
};

export const MOCK_BOOKINGS: MockBooking[] = [
  {
    id: 'bk-24018',
    reference: 'TFY-24018',
    title: 'Roman Holiday',
    destination: 'Rome, Italy',
    image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&h=600&q=80',
    startDate: '2026-07-12',
    endDate: '2026-07-18',
    status: 'check-in',
    total: '£2,840',
    travelers: 2,
    segments: [
      { type: 'flight', label: 'Outbound flight', detail: 'London Heathrow → Rome Fiumicino · BA 554 · 12 Jul, 09:15' },
      { type: 'hotel', label: 'Grand Plaza Rome', detail: '6 nights · Deluxe room · Breakfast included' },
      { type: 'activity', label: 'Colosseum skip-the-line', detail: '13 Jul · 10:00 · 2 guests' },
      { type: 'flight', label: 'Return flight', detail: 'Rome Fiumicino → London Heathrow · BA 555 · 18 Jul, 18:40' },
    ],
  },
  {
    id: 'bk-23902',
    reference: 'TFY-23902',
    title: 'Bali Wellness Escape',
    destination: 'Ubud, Indonesia',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&h=600&q=80',
    startDate: '2026-08-22',
    endDate: '2026-08-30',
    status: 'confirmed',
    total: '£3,120',
    travelers: 2,
    segments: [
      { type: 'flight', label: 'Outbound flight', detail: 'Amsterdam → Denpasar · KL 835 · 22 Aug, 11:20' },
      { type: 'hotel', label: 'Bali Rice Retreat', detail: '8 nights · Pool villa · Half board' },
      { type: 'activity', label: 'Sunrise trek & spa day', detail: '24 Aug · Private guide · 2 guests' },
      { type: 'flight', label: 'Return flight', detail: 'Denpasar → Amsterdam · KL 836 · 30 Aug, 23:55' },
    ],
  },
  {
    id: 'bk-23144',
    reference: 'TFY-23144',
    title: 'Northern Lights Adventure',
    destination: 'Reykjavik, Iceland',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&h=600&q=80',
    startDate: '2025-11-08',
    endDate: '2025-11-14',
    status: 'completed',
    total: '£2,460',
    travelers: 2,
    segments: [
      { type: 'flight', label: 'Round trip', detail: 'San Francisco → Reykjavik · FI 680 / FI 681' },
      { type: 'hotel', label: 'Aurora Lodge Iceland', detail: '6 nights · Glacier view suite' },
      { type: 'activity', label: 'Golden Circle tour', detail: '10 Nov · Small group · 2 guests' },
    ],
  },
  {
    id: 'bk-22890',
    reference: 'TFY-22890',
    title: 'Paris Long Weekend',
    destination: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&h=600&q=80',
    startDate: '2025-05-16',
    endDate: '2025-05-19',
    status: 'completed',
    total: '£1,180',
    travelers: 1,
    segments: [
      { type: 'flight', label: 'Round trip', detail: 'London St Pancras → Paris Gare du Nord · Eurostar' },
      { type: 'hotel', label: 'Paris Boutique Marais', detail: '3 nights · Classic double' },
    ],
  },
];

export const statusLabels: Record<BookingStatus, string> = {
  confirmed: 'Confirmed',
  'check-in': 'Check-in open',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export function formatBookingDateRange(start: string, end: string, locale = 'en-GB'): string {
  const startDate = new Date(`${start}T12:00:00`);
  const endDate = new Date(`${end}T12:00:00`);
  const formatter = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  return `${formatter.format(startDate)} – ${formatter.format(endDate)}`;
}

export function partitionBookings(bookings: MockBooking[]) {
  const upcoming = bookings.filter((b) => b.status !== 'completed' && b.status !== 'cancelled');
  const past = bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');
  upcoming.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  past.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  return { upcoming, past };
}
