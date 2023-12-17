import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { FiSend } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { AffectedCommentType, CommentType } from "@/model/CommentType";
import { useTranslations } from "next-intl";

export const getCommentsData = async () => {
  return [
    {
      id: "10",
      reviewId: "",
      user: {
        id: "a",
        name: "Trần Văn A",
        avatar: "https://i.pravatar.cc/299",
      },
      desc: "Điểm của em là đúng rồi nhé",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2022-12-31T17:22:05.092+0000",
      like: 120,
      like_status: false,
    },
    {
      id: "11",
      reviewId: "",
      user: {
        id: "b",
        name: "Lâm Ánh Hạ",
        avatar: "https://i.pravatar.cc/300",
      },
      desc: ":(",
      post: "1",
      parent: "10",
      replyOnUser: "a",
      createdAt: "2022-12-31T17:22:05.092+0000",
      like: 10,
      like_status: false,
    },
    {
      id: "12",
      reviewId: "",
      user: {
        id: "c",
        name: "Trần Nhật Minh",
        avatar: "https://i.pravatar.cc/301",
      },
      desc: "Đáp án câu này chưa đúng nên thầy không cho em điểm được",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2022-12-31T17:22:05.092+0000",
      like: 54,
      like_status: false,
    },
    {
      id: "13",
      reviewId: "",
      user: {
        id: "d",
        name: "Nguyễn Bảo Hân",
        avatar: "https://i.pravatar.cc/302",
      },
      desc: "Ráng làm bài sau tốt hơn em nhé",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2022-12-31T17:22:05.092+0000",
      like: 32,
      like_status: true,
    },
  ];
};

const CommentContainer = () => {
  const auth = useAuth();
  const t = useTranslations("Comment");

  const [comments, setComments] = useState<CommentType[]>([]);
  useEffect(() => {
    (async () => {
      const commentData = await getCommentsData();
      setComments(commentData);
    })();
  }, []);
  const mainComments = comments.filter((comment) => comment.parent === null);
  const [affectedComment, setAffectedComment] =
    useState<AffectedCommentType | null>(null);

  const addCommentHandler = (
    value: string,
    parent: string | null,
    replyOnUser: string | null
  ) => {
    const newComment = {
      id: Math.random().toString(),
      user: {
        id: auth.user?.id,
        name: auth.user?.username,
        avatar: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: new Date().toISOString(),
      like: 0,
    };
    setComments((curState: any) => {
      return [newComment, ...curState];
    });

    setAffectedComment(null);
  };
  const updateCommentHandler = (value: string, commentId: string) => {
    const updateComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, desc: value };
      }
      return comment;
    });
    setComments(updateComments);
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId: string) => {
    const updateComments = comments.filter((comment) => {
      return comment.id !== commentId;
    });
    setComments(updateComments);
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
