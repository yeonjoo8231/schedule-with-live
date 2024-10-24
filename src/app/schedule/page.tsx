import { fetchSchedule } from './actions';
export default async function Page() {
  const bookings = await fetchSchedule();

  return (
    <div>
      {bookings.map((book) => (
        <div key={book.id}>{book.summary}</div>
      ))}
    </div>
  );
}
