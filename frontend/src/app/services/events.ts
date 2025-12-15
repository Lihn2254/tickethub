import { ApiEvent, ApiFlyer } from "../types/eventTypes";
import { apiUrl } from "../api";

export default async function getEvents(
  genres: string[] | null,
  cities: string[] | null,
  start: Date | null,
  end: Date | null
): Promise<ApiEvent[]> {

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

export async function getFlyerImages(flyerPaths: string[]): Promise<ApiFlyer[]> {
  const params = new URLSearchParams();

  if(flyerPaths) {
    flyerPaths.forEach(flyerImg => params.append('flyer_path', flyerImg));
  }

  const queryString = params.toString();

  const res = await fetch(`${apiUrl}/events/images?${queryString}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  return res.json();
}