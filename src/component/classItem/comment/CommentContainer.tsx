import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { FiSend } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import {
  AffectedCommentType,
  CommentType,
  RawCommentType,
} from "@/model/CommentType";
import { useTranslations } from "next-intl";
import axios from "axios";
import { UserType } from "@/model/UserType";
import { actions } from "@/app/[locale]/(Main)/state";
import { useParams, usePathname } from "next/navigation";
import { NotificationType } from "@/model/NotificationType";
import { ClassListType } from "@/model/ClassListType";

interface CommentContainerInterface {
  reviewId: string;
  studentId: string;
}

const CommentContainer = (props: CommentContainerInterface) => {
  const auth = useAuth();
  const { classId } = useParams();
  const pathname = usePathname();
  const t = useTranslations("Comment");
  const savedUser = localStorage.getItem("user");
  let currentUser: UserType;
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }

  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    let responseData: RawCommentType[];

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}review/getComments/${props.reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.access_token}`,
          },
        }
      )
      .then((response) => {
        console.log("Response", response);

        responseData = response.data as RawCommentType[];

        let tempComments = [];

        for (let comment of responseData) {
          //TODO: update temp values
          let tempName = comment.isSender ? currentUser.username : "Lâm Ánh Hạ";

          let tempAvatar = comment.isSender
            ? "https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
            : "https://i.pravatar.cc/300";
          // let tempAvatar =
          //   "https://cdn-icons-png.flaticon.com/128/1077/1077114.png";

          tempComments.push({
            id: comment._id,
            reviewId: comment.review_id,
            user: {
              id: comment.sender_id,
              name: tempName,
              avatar: tempAvatar,
            },
            desc: comment.desc,
            parent: comment.parent ? comment.parent : null,
            replyOnUser: comment.replyOnUser ? comment.replyOnUser : null,
            createdAt: comment.createdAt,
            like: comment.like,
            isSender: comment.isSender,
            like_status: false,
          });
        }

        console.log("temp comments", tempComments);

        setComments(tempComments);
      })
      .catch((error) => {
        console.error("Error fetching comment list:", error);
      });
  }, [props.reviewId]);

  const mainComments = comments.filter(
    (comment) => comment.parent === null || undefined
  );
  const [affectedComment, setAffectedComment] =
    useState<AffectedCommentType | null>(null);

  const addCommentHandler = async (
    value: string,
    parent: string | null,
    replyOnUser: string | null
  ) => {
    if (value === "") return;
    const newRawComment = {
      review_id: props.reviewId,
      desc: value,
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: new Date().toISOString(),
      like: 0,
    };

    console.log("newRawComment", newRawComment);

    let newId;

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}review/createComment`,
        {
          review_id: props.reviewId,
          desc: value,
          parent: parent,
          replyOnUser: replyOnUser,
          createdAt: newRawComment.createdAt,
          like: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.access_token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("Success creating comment ", response.data);
          newId = response.data._id;

          console.log("Log out review.id:", props.reviewId);

          // notification
          (async () => {
            let senderRole: string,
              message: string,
              redirectUrl: string,
              receiverIdList: string[],
              allMembersList: ClassListType[];

            receiverIdList = [];

            await axios
              .get(
                `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/${classId}/members`,
                {
                  headers: {
                    Authorization: `Bearer ${currentUser?.access_token}`,
                  },
                }
              )
              .then((response) => {
                allMembersList = response.data.members;

                if (allMembersList.length > 0) {
                  if (pathname.includes("teaching")) {
                    senderRole = "Teacher";
                    message = "teacher_reply";
                    redirectUrl = `/enrolled/${classId}/review`;

                    allMembersList.forEach((member) => {
                      if (
                        member.role === "Student" &&
                        member.student_id === props.studentId
                      ) {
                        receiverIdList.push(member.user_id);
                      }
                    });
                  } else {
                    receiverIdList.push(response.data.host_user._id);

                    senderRole = "Student";
                    message = "student_reply";
                    redirectUrl = `/teaching/${classId}/review`;

                    allMembersList.forEach((member) => {
                      if (member.role === "Teacher") {
                        receiverIdList.push(member.user_id);
                      }
                    });
                  }
                }

                let newNotification: NotificationType;
                newNotification = {
                  id: "",
                  senderId: "",
                  classId: classId.toString(),
                  reviewId: props.reviewId,
                  senderRole: senderRole,
                  receiverIdList: receiverIdList,
                  message: message,
                  redirectUrl: redirectUrl,
                  createdAt: newRawComment.createdAt,
                  isRead: false,
                };

                actions.sendNotification(
                  currentUser.access_token,
                  newNotification
                );
              })
              .catch((error) => {
                console.error("Error fetching class members:", error);
              });
          })();
          // end send notification
        }
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
        return;
      });

    const newComment = {
      id: newId,
      user: {
        // id: auth.user?._id,
        id: currentUser?.id,
        name: auth.user?.username,
        avatar: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
      },
      desc: value,
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: newRawComment.createdAt,
      like: 0,
      isSender: true,
    };
    setComments((curState: any) => {
      return [newComment, ...curState];
    });

    setAffectedComment(null);
  };

  const updateCommentHandler = async (value: string, commentId: string) => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}review/updateComment`,
        {
          id: commentId,
          desc: value,
          like: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.access_token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("Success updating comment");

          const updateComments = comments.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, desc: value, like: 0 };
            }
            return comment;
          });

          setComments(updateComments);
          setAffectedComment(null);
        }
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
        return;
      });
  };

  const deleteCommentHandler = async (commentId: string) => {
    console.log("Delete commentId:", commentId);

    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}review/deleteComment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.access_token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const updateComments = comments.filter((comment) => {
            return comment.id !== commentId;
          });
          setComments(updateComments);
        }
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        return;
      });
  };

  const getRepliesHandler = (commentId: string) => {
    return comments
      .filter((comment) => comment.parent === commentId)
      .sort((former, latter) => {
        return (
          new Date(former.createdAt).getTime() -
          new Date(latter.createdAt).getTime()
        );
      });
  };

  const likeCommentHandler = (commentId: string) => {
    setComments((curState) => {
      return curState.map((comment) => {
        if (comment.id === commentId) {
          const updatedLikeStatus = !comment.like_status;
          const updatedLikeCount = updatedLikeStatus
            ? comment.like + 1
            : comment.like - 1;
          return {
            ...comment,
            like: updatedLikeCount,
            like_status: updatedLikeStatus,
          };
        }
        return comment;
      });
    });
  };

  return (
    <React.Fragment>
      <div>
        <div className="container m-2 text-left italic text-blue-400 font-roboto">
          {Object.keys(comments).length} {t("comments")}
        </div>
        <CommentForm
          btnLabel={<FiSend />}
          formSubmitHandler={(value) => addCommentHandler(value, null, null)}
          formCancelHandler={() => {}}
          initialText=""
        />
        <div className="overflow-auto h-60 space-y-2">
          {mainComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              addComment={addCommentHandler}
              updateComment={updateCommentHandler}
              deleteComment={deleteCommentHandler}
              likeComment={likeCommentHandler}
              replies={getRepliesHandler(comment.id)}
              parentId={comment.parent}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CommentContainer;
