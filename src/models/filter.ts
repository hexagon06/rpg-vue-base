export type Filter<T> = {
  apply(collection: T[]): T[];
};

export type FilterResult = {
  count: number;
  pageSize: number;
  currentPage: number;
};

export function defaultResult(): FilterResult {
  return {
    count: 0,
    pageSize: 20,
    currentPage: 1,
  };
}

export class CreatureFilter {
  search: string = '';
  size: string[] = [];
  type: string[] = [];
  environment: string[] = [];
  tags: string[] = [];
  system: string[] = [];
  cr: number[] = [];
  source: string[] = [];
  favorite: boolean = false;
}

export type CreatureFilterOptions = {
  size: string[];
  type: string[];
  environment: string[];
  organisation: string[];
  tags: string[];
  system: string[];
  cr: number[];
  source: string[];
};

export type IdeaFilterOptions = {
  tags: string[];
  categories: string[];
};

export function defaultCreatureFilterOptions(): CreatureFilterOptions {
  return {
    size: [],
    type: [],
    organisation: [],
    environment: [],
    tags: [],
    system: [],
    cr: [],
    source: [],
  };
}

export type AbillityFilterOptions = {
  tags: string[];
};

export type ListFilter = {
  search: string;
};

export type ListFilterOptions = {};
