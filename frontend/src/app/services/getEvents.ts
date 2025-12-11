import { apiUrl } from "../utils";

export default async function getEvents(
  genres: string[] | null, 
  cities: string[] | null, 
  start: Date | null, 
  end: Date | null
): Promise<Xevent[]> {

  const params = new URLSearchParams();

  if (genres) {
    genres.forEach(genre => params.append('genre', genre));
  }
  if (cities) {
    cities.forEach(city => params.append('city', city));
  }
  if (start) {
    params.append('start', start.toISOString());
  }
  if (end) {
    params.append('end', end.toISOString());
  }

  const queryString = params.toString();

  const fetchUrl = queryString 
    ? `${apiUrl}/events?${queryString}` 
    : `${apiUrl}/events`;

  const res = await fetch(fetchUrl);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  return res.json();
}