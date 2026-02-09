import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '../api/events';

export function Stats() {
  const { data, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });

  if (isLoading) return <p>Loading stats…</p>;

  return (
    <ul>
      {data!.map((row) => (
        <li key={row.type}>
          {row.type}: {row.count}
        </li>
      ))}
    </ul>
  );
}
