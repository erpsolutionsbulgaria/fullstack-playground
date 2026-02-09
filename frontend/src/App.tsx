import { EventsTable } from './components/EventsTable';
import { Stats } from './components/Stats';

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Event Explorer</h1>

      <h2>Stats</h2>
      <Stats />

      <h2>Recent Events</h2>
      <EventsTable />
    </div>
  );
}
