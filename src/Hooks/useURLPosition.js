import { useSearchParams } from "react-router-dom";

export function useURLPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat") || null;
  const lng = searchParams.get("lng") || null;

  return [lat, lng];
}
