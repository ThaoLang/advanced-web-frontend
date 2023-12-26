export type CommentType = {
  id: string;
  reviewId: string;
  user: { id: string; name: string; avatar: string };
  desc: string;
  parent: string | null;
  replyOnUser: string | null;
  createdAt: string;
  like: number;
  like_status: boolean; // save locally?
};

export type AffectedCommentType = {
  type: string;
  id: string;
};
