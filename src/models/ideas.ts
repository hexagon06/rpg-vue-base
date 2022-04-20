import { DatedItem, IdItem, Reference, Tag } from '.';

export type IdeaBase = {
  title: string;
  synopsis: string;
  tags: string[];
  userId: string;
  category?: string;
};

export type IdeaIndex = Reference & DatedItem & IdeaBase;

export function getIdeaIndex(id: string, idea: Idea): IdeaIndex {
  return {
    id,
    title: idea.title,
    synopsis: idea.synopsis,
    tags: idea.tags,
    userId: idea.userId,
    category: idea.category,
    created: idea.created,
    lastEdited: idea.lastEdited,
  };
}

export type Idea = IdItem &
  DatedItem &
  IdeaBase & {
    text: string;
  };

export type FilledIdea = IdItem &
  DatedItem &
  IdeaBase & {
    text: string;
  };
