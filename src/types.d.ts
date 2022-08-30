import { comment } from "@prisma/client";

export type UserInfo = {
  user_id: string;
  post_id: string;
  value: number;
  username: string;
  password: string;
  date: string | Date;
};

export type PostInfo = {
  title: string;
  content: string;
  author: string;
  image: string | null;
};

export type ReactionInfo = {
  user_id: string;
  post_id: string;
  value: number;
};

export type DetailsInfo = {
  uuid: string;
  country: string;
  city: string;
  hasFishingCard: boolean;
  yearsOfExperience: number;
  biggestCatch: number;
};
export type ReactionInfo = { user_id: string; post_id: string; value: string };

export type IdParam = {
  uuid: string;
};

export type Login = {
  username: string | null;
  user_id: string | null;
};

export type UserCredentials = Omit<UserInfo, "date", "user_id">;

export type Post = {
  post_id: string;
  title: string | null;
  content: string;
  author: string;
  created_at: Date | null;
  image: string | null;
  likes: number;
  reacted: boolean;
  reactedValue: number | null;
  comments: object[];
};

export type Best = Omit<Post, "reacted" | "reactedValue" | "comments">;

export type Comment = {
  parent_id: string;
  user_id: string;
  content: string;
};
