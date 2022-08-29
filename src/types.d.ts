export type UserInfo = {
  user_id: string;
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
  value: string;
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
