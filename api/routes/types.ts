export type ColorType = {
  id: number;
  created_at: string;
  hex: string;
  r: number;
  g: number;
  b: number;
};

export type ClusterType = {
  id: number;
  created_at: string;
  color_id: number;
  day_id: number;
  freq: number;
  percent: number;
};

export type DayType = {
  id: number;
  created_at: string;
  date: string;
  hdurl: string;
  media_type: string;
  title: string;
  url: string;
  exclude_from_results: boolean;
};

export type CacheResult = {
  isCached: boolean;
  result: DayType[];
};

export type SearchResult = DayType[];
