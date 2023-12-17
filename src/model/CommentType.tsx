export type CommentType = {
  id: string;
  reviewId: string;
  user: { id: string; name: string; avatar: string };
  desc: string;
  post: string;
  parent: string | null;
  replyOnUser: string | null;
  createdAt: string;
  like: number;
  like_status: boolean;
};

export type AffectedCommentType = {
  type: string;
  id: string;
};
