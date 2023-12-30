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

// export const getCommentsData = async () => {
//   return [
//     {
//       id: "10",
//       reviewId: "",
//       user: {
//         id: "a",
//         name: "Trần Văn A",
//         avatar: "https://i.pravatar.cc/299",
//       },
//       desc: "Điểm của em là đúng rồi nhé",
//       parent: null,
//       replyOnUser: null,
//       createdAt: "2022-12-31T17:22:05.092+0000",
//       like: 120,
//       like_status: false,
//     },
//     {
//       id: "11",
//       reviewId: "",
//       user: {
//         id: "b",
//         name: "Lâm Ánh Hạ",
//         avatar: "https://i.pravatar.cc/300",
//       },
//       desc: ":(",
//       parent: "10",
//       replyOnUser: "a",
//       createdAt: "2022-12-31T17:22:05.092+0000",
//       like: 10,
//       like_status: false,
//     },
//     {
//       id: "12",
//       reviewId: "",
//       user: {
//         id: "c",
//         name: "Trần Nhật Minh",
//         avatar: "https://i.pravatar.cc/301",
//       },
//       desc: "Đáp án câu này chưa đúng nên thầy không cho em điểm được",
//       parent: null,
//       replyOnUser: null,
//       createdAt: "2022-12-31T17:22:05.092+0000",
//       like: 54,
//       like_status: false,
//     },
//     {
//       id: "13",
//       reviewId: "",
//       user: {
//         id: "d",
//         name: "Nguyễn Bảo Hân",
//         avatar: "https://i.pravatar.cc/302",
//       },
//       desc: "Ráng làm bài sau tốt hơn em nhé",
//       parent: null,
//       replyOnUser: null,
//       createdAt: "2022-12-31T17:22:05.092+0000",
//       like: 32,
//       like_status: true,
//     },
//   ];
// };

interface CommentContainerInterface {
  reviewId: string;
}

const CommentContainer = (props: CommentContainerInterface) => {
  const auth = useAuth();
  const t = useTranslations("Comment");
  const savedUser = localStorage.getItem("user");
  let currentUser: UserType;
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }

  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    // (async () => {
    //   const commentData = await getCommentsData();
    //   setComments(commentData);
    // })();
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
          let tempName = comment.isSender
            ? // currentUser?.id === comment.sender_id
              currentUser.username
            : "Lâm Ánh Hạ"; //replace

          let tempAvatar = comment.isSender
            ? // currentUser?.id === comment.sender_id
              "https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
            : "https://i.pravatar.cc/300";

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
  }, []);

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
          console.log("Success");
        }
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
        return;
      });

    const newComment = {
      id: Math.random().toString(), //get id from response
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
