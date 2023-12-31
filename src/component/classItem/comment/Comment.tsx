"use client";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import DeletePopupModal from "./DeletePopupModal";
import CommentForm from "./CommentForm";
import { AffectedCommentType, CommentType } from "@/model/CommentType";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface CommentProps {
  comment: CommentType;
  affectedComment: AffectedCommentType | null;
  setAffectedComment: (affectedComment: AffectedCommentType | null) => void;
  addComment: (
    value: string,
    parent: string | null,
    replyOnUser: string | null
  ) => void;
  updateComment: (value: string, commentId: string) => void;
  deleteComment: (commentId: string) => void;
  likeComment: (commentId: string) => void;
  replies: CommentType[] | null;
  parentId: string | null;
}

const Comment = (props: CommentProps) => {
  const t = useTranslations("Comment");

  const isUserLoggined = true;
  const isCommentBelongsToUser = props.comment.isSender;
  const isReplying =
    props.affectedComment &&
    props.affectedComment.type === "replying" &&
    props.affectedComment.id === props.comment.id;
  const isEditing =
    props.affectedComment &&
    props.affectedComment.type === "editing" &&
    props.affectedComment.id === props.comment.id;
  const repliedCommentId = props.parentId ? props.parentId : props.comment.id;
  const replyOnUserId = props.comment.user.id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState("");
  const { locale } = useParams();
  const language = locale === "en" ? "en-EN" : "vi-VN";

  const openModal = (comment: any) => {
    setCommentToDelete(comment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCommentToDelete("");
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (commentToDelete !== "") props.deleteComment(props.comment.id);
    closeModal();
  };

  return (
    <React.Fragment>
      {isModalOpen && (
        <DeletePopupModal
          comment={commentToDelete}
          onClose={closeModal}
          onDelete={handleDelete}
        />
      )}
      <div className="flex flex-row gap-x-3 bg-[#ECECEC] p-3 rounded-xl">
        {!isEditing && (
          <div
            className="rounded-full w-14 h-14 aspect-square mr-5"
            style={{
              backgroundImage: `url(${props.comment.user.avatar})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
        <div className="flex-1 flex flex-col text-start">
          {!isEditing && (
            <>
              <h5 className="font-bold text-dark-hard text-xs">
                {props.comment.user.name}
              </h5>
              <span className="text-xs text-dark-light">
                {new Date(props.comment.createdAt).toLocaleDateString(
                  language,
                  {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  }
                )}
              </span>
              <p className="font-roboto mt-[10px] text-dark-light">
                {props.comment.desc}
              </p>
            </>
          )}

          {isEditing && (
            <CommentForm
              btnLabel={<FiSend />}
              formSubmitHandler={(value) => {
                props.updateComment(value, props.comment.id);
                props.setAffectedComment(null);
              }}
              formCancelHandler={() => props.setAffectedComment(null)}
              initialText={props.comment.desc}
            ></CommentForm>
          )}
          <div className="flex items-center gap-x-3 text-dark-light be-viet-nam-pro-regular text-sm my-3">
            {isUserLoggined && (
              <button
                className="flex items-center space-x-2 hover:font-bold cursor-pointer"
                type="submit"
                onClick={() =>
                  props.setAffectedComment({
                    type: "replying",
                    id: props.comment.id,
                  })
                }
              >
                {/* <FiMessageSquare className="w-4 h-auto" /> */}
                <span>{t("reply")}</span>
              </button>
            )}
            {isCommentBelongsToUser && (
              <>
                <button
                  className="flex items-center space-x-2 hover:font-bold cursor-pointer"
                  type="submit"
                  onClick={() =>
                    props.setAffectedComment({
                      type: "editing",
                      id: props.comment.id,
                    })
                  }
                >
                  {/* <FiEdit2 className="w-4 h-auto" /> */}
                  <span>{t("edit")}</span>
                </button>
                <button
                  className="flex items-center space-x-2 text-[#F10000] hover:font-bold cursor-pointer"
                  type="submit"
                  onClick={(comment) => {
                    openModal(comment);
                  }}
                >
                  {/* <FiTrash className="w-4 h-auto" /> */}
                  <span>{t("delete")}</span>
                </button>
              </>
            )}

            <div className="bg-white w-auto rounded-full flex flex-row">
              <button
                className="text-[#CC3333] ml-1 cursor-pointer"
                onClick={() => props.likeComment(props.comment.id)}
              >
                {props.comment.like_status ? (
                  <span>
                    <FaHeart></FaHeart>
                  </span>
                ) : (
                  <span>
                    <FaRegHeart></FaRegHeart>
                  </span>
                )}
              </button>
              <p className="text-black my-1 mx-1 text-xs md:text-xs lg:text-sm">
                {props.comment.like}
              </p>
            </div>
          </div>
          {isReplying && (
            <CommentForm
              btnLabel={<FiSend />}
              formSubmitHandler={(value) =>
                props.addComment(value, repliedCommentId, replyOnUserId)
              }
              formCancelHandler={() => props.setAffectedComment(null)}
              initialText=""
            />
          )}
          {props.replies && props.replies.length > 0 && (
            <div>
              {props.replies.map((reply) => (
                <Comment
                  key={reply.id}
                  addComment={props.addComment}
                  comment={reply}
                  deleteComment={props.deleteComment}
                  updateComment={props.updateComment}
                  affectedComment={props.affectedComment}
                  setAffectedComment={props.setAffectedComment}
                  likeComment={props.likeComment}
                  parentId={props.comment.id}
                  replies={[]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Comment;
