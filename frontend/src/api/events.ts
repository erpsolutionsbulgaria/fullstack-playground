const API_URL = 'http://localhost:3000';

export type Event = {
  id: string;
  type: string;
  source: string;
  occurred_at: string;
  received_at: string;
  properties: Record<string, unknown>;
};

export async function fetchEvents(params?: {
  type?: string;
  limit?: number;
}) {
  const query = new URLSearchParams();
  if (params?.type) query.set('type', params.type);
  if (params?.limit) query.set('limit', String(params.limit));

  const res = await fetch(`${API_URL}/events?${query.toString()}`);
  console.log("BAHUR4EEE >>>>", res);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json() as Promise<Event[]>;
}

export async function fetchStats() {
  const res = await fetch(`${API_URL}/events/stats/by-type`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json() as Promise<{ type: string; count: number }[]>;
}
