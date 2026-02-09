import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../api/events';

export function EventsTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents({ limit: 50 }),
  });

  if (isLoading) return <p>Loading events…</p>;
  if (error) return <p>Error loading events</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Source</th>
          <th>Received At</th>
        </tr>
      </thead>
      <tbody>
        {data!.map((e) => (
          <tr key={e.id}>
            <td>{e.type}</td>
            <td>{e.source}</td>
            <td>{new Date(e.received_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
