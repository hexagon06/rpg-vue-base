import { DatedItem, IdItem, Reference, ReferenceInstance, ReferenceListItem } from '.';

export const diceRegex = new RegExp(/(~[\S]+?$|\s)/);
export const justDiceRegex = new RegExp(/~([\S]+?)(?:$|\s)/);

export type RollingListItem = {
  id: string;
  label: string;
  weight: number;
  order: number;
  repeatable: boolean;
  reference?: string | { routerName: string; id: string };
};

export function getRollingListItem(lastOrder: number): RollingListItem {
  const id = Date.now().toString();
  return {
    id,
    label: '',
    weight: 1,
    order: lastOrder + 1,
    repeatable: true,
  };
}

export type RollingListBase = {
  name: string;
  userId: string;
};

export type RollingListIndex = Reference &
  DatedItem &
  RollingListBase & {
    itemCount: number;
  };

export function getRollingListIndex(id: string, idea: RollingList): RollingListIndex {
  return {
    id,
    userId: idea.userId,
    name: idea.name,
    itemCount: idea.items.length,
    created: idea.created,
    lastEdited: idea.lastEdited,
  };
}

export type RollingList = IdItem &
  DatedItem &
  RollingListBase & {
    items: (ReferenceListItem & RollingListItem)[];
  };

export type FilledRollingList = IdItem &
  DatedItem &
  RollingListBase & {
    items: (ReferenceListItem & ReferenceInstance)[];
  };
