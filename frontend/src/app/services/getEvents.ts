import { apiUrl } from "../utils";

export default async function getEvents(
  genres: string[] | null, 
  cities: string[] | null, 
  start: Date | null, 
  end: Date | null
): Promise<Xevent[]> {

  // 1. Create a URLSearchParams object to build the query string
  const params = new URLSearchParams();

  // 2. Safely add parameters ONLY if they are not null
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

  // 3. Convert the params object to a string
  const queryString = params.toString();

  // 4. Append the query string to the URL (if it exists)
  const fetchUrl = queryString 
    ? `${apiUrl}/events?${queryString}` 
    : `${apiUrl}/events`;

  // 5. Make the fetch call
  const res = await fetch(fetchUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  return res.json();
}