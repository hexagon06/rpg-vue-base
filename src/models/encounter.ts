import { CreatureIndex, DatedItem, IdItem, Reference, ReferenceCount } from '.';
import { Tag } from './tags';

export type EncounterBase = {
  name: string;
  synopsis: string;
  tags: Tag[];
  group?: string;
};

export type EncounterIndex = Reference & DatedItem & EncounterBase;

export function getEncounterIndex(id: string, encounter: Encounter): EncounterIndex {
  return {
    id,
    name: encounter.name,
    synopsis: encounter.synopsis,
    tags: encounter.tags,
    created: encounter.created,
    lastEdited: encounter.lastEdited,
  };
}

export type Encounter = IdItem &
  DatedItem &
  EncounterBase & {
    flavorText: string;
    description: string;
    reward?: string;
    locations: Reference[];
    creatures: ReferenceCount[];
    environment: string[];
  };

export type FilledEncounter = IdItem &
  DatedItem &
  EncounterBase & {
    flavorText: string;
    description: string;
    reward?: string;
    locations: Reference[];
    creatures: (CreatureIndex & { count: number })[];
    environment: string[];
  };
