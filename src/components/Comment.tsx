import { Button } from "react-aria-components";
import { IconEdit, IconReply } from "./Icons";
import { useRef, useState } from "react";
import CustomForm from "./CustomForm";
import CustomModal from "./CustomModal";
import Score from "./Score";

type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

type CommentProp = {
  id: string;
  comments: Comment[];
  currentUser: User;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: string[];
  original: boolean;
};

const CommentComponent: React.FunctionComponent<CommentProp> = ({
  id,
  comments,
  currentUser,
  setComments,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function handleReply(): void {
    setIsReplyOpen(!isReplyOpen);
  }

  function handleDelete(index: string): void {
    setComments(comments.filter((elem) => elem.id != index));
  }

  function handleUpdate(): void {
    if (inputRef.current && inputRef.current.value) {
      setComments([
        ...comments.filter((elem) => elem.id != id),
        {
          ...comment,
          content: inputRef.current.value,
        },
      ]);
    }

    setIsEditing(false);
  }

  const comment = comments.filter((elem) => elem.id == id)[0];

  return (
    <>
      <article className="relative flex flex-col gap-4 rounded-md bg-neutral-5 p-4">
        <div className="flex flex-row items-center gap-4 md:pl-12">
          <picture className="h-8 w-8">
            <img
              src={`/${comment.user.image.png}`}
              alt={`/${comment.user.image.png}`}
            />
          </picture>
          <span className="font-medium text-neutral-1">
            {comment.user.username}
          </span>
          {comment.user.username == currentUser.username ? (
            <span className="bg-primary-1 px-1 text-sm text-neutral-5">
              You
            </span>
          ) : null}
          <span>{comment.createdAt}</span>
        </div>
        {isEditing ? (
          <textarea
            className="focus:outline-primary-1 focus-visible:outline-1 md:pl-12"
            ref={inputRef}
            defaultValue={comment.content}
            autoFocus
          ></textarea>
        ) : (
          <p className="md:pl-12">{comment.content}</p>
        )}

        <div className="flex flex-row items-center justify-between">
          <Score id={id} comments={comments} setComments={setComments}></Score>
          <div className="flex flex-row items-center gap-4 md:absolute md:right-8 md:top-5">
            {comment.user.username == currentUser.username ? (
              <>
                {isEditing ? (
                  <button
                    onClick={() => handleUpdate()}
                    className="rounded-md bg-primary-1 px-6 py-2 uppercase text-neutral-5 hover:opacity-70 focus-visible:opacity-70 disabled:bg-neutral-2"
                  >
                    update
                  </button>
                ) : (
                  <>
                    <CustomModal
                      index={comment.id}
                      handleDelete={handleDelete}
                    ></CustomModal>
                    <Button
                      onPress={() => setIsEditing(!isEditing)}
                      className="flex flex-row items-center gap-2 font-medium text-primary-1 hover:opacity-70 focus-visible:opacity-70"
                    >
                      <IconEdit></IconEdit>
                      <span>Edit</span>
                    </Button>
                  </>
                )}
              </>
            ) : (
              <Button
                onPress={handleReply}
                className="flex flex-row items-center gap-2 font-medium text-primary-1 hover:opacity-70 focus-visible:opacity-70"
              >
                <IconReply></IconReply>
                <span>Reply</span>
              </Button>
            )}
          </div>
        </div>
      </article>

      {isReplyOpen ? (
        <CustomForm
          type="reply"
          parent={comment.id}
          currentUser={currentUser}
          comments={comments}
          setComments={setComments}
          original={false}
          setIsReplyOpen={setIsReplyOpen}
        ></CustomForm>
      ) : null}

      {comment.replies && comment.replies.length > 0 ? (
        <div className="flex flex-col gap-4 border-l-2 border-solid border-neutral-3 pl-4">
          {comments
            .filter((elem) => comment.replies.includes(elem.id))
            .map((elem, index) => (
              <CommentComponent
                key={index}
                id={elem.id}
                currentUser={currentUser}
                comments={comments}
                setComments={setComments}
              ></CommentComponent>
            ))}
        </div>
      ) : null}
    </>
  );
};

export default CommentComponent;
