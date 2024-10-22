import { fetchSchedule } from './actions';

export default function Page() {
  const data = fetchSchedule();
  return <div>calendar page</div>;
}
