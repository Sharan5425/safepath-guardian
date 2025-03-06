
export interface SafetyArea {
  id: string;
  name: string;
  rating: number;
  position: [number, number];
  radius: number;
}

export interface SearchResult {
  id: string;
  name: string;
  position: [number, number];
}
