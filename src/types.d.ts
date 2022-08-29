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
  image: string;
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
  yearsOfExperience: number | null;
  biggestCatch: number | null;
};
export type ReactionInfo = { user_id: string; post_id: string; value: string };

export type IdParam = {
  uuid: string;
};

export type UserCredentials = Omit<UserInfo, "date", "user_id">;
