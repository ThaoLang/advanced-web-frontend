export type NotificationType = {
  id: string;
  classId: string;
  reviewId: string | undefined;
  senderId: string; //name?
  senderRole: string; //?
  receiverIdList: string[];
  message: string; // A grade composition is finalized / A grade review is finalized / A teacher has replied / A student has replied
  //   parent: string | null;
  //   replyOnUser: string | null;
  redirectUrl: string;
  createdAt: string;
  isRead: boolean;
};
