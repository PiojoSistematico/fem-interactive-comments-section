import { Button } from "react-aria-components";
import { IconDelete, IconEdit, IconMinus, IconPlus, IconReply } from "./Icons";
import { useState } from "react";
import CustomForm from "./CustomForm";
import CustomModal from "./CustomModal";

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
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  function handleReply(): void {
    setIsReplyOpen(!isReplyOpen);
  }

  function handleDelete(index: string): void {
    setComments(comments.filter((elem) => elem.id != index));
  }

  function handleEdit(index: string): void {}

  const comment = comments.filter((elem) => elem.id == id)[0];

  return (
    <>
      <article className="flex flex-col gap-4 rounded-md bg-neutral-5 p-4">
        <div className="flex flex-row items-center gap-4">
          <picture className="h-8 w-8">
            <img src={`src/assets/${comment.user.image.png}`} alt="Avatar" />
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
        <p>{comment.content}</p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4 rounded-md bg-neutral-4 p-2">
            <Button>
              <IconPlus></IconPlus>
            </Button>
            <span className="font-medium text-primary-1">{comment.score}</span>
            <Button>
              <IconMinus></IconMinus>
            </Button>
          </div>
          <div className="flex flex-row items-center gap-4">
            {comment.user.username == currentUser.username ? (
              <>
                {/* <Button
                  onPress={() => handleDelete(comment.id)}
                  className="flex flex-row items-center gap-2 font-medium text-primary-2"
                >
                  <IconDelete></IconDelete>
                  <span>Delete</span>
                </Button> */}
                <CustomModal
                  index={comment.id}
                  handleDelete={handleDelete}
                ></CustomModal>
                <Button
                  onPress={() => handleEdit(comment.id)}
                  className="flex flex-row items-center gap-2 font-medium text-primary-1"
                >
                  <IconEdit></IconEdit>
                  <span>Edit</span>
                </Button>
              </>
            ) : (
              <Button
                onPress={handleReply}
                className="flex flex-row items-center gap-2 font-medium text-primary-1"
              >
                <IconReply></IconReply>
                <span>Reply</span>
              </Button>
            )}
          </div>
        </div>
      </article>

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

      {isReplyOpen ? (
        <CustomForm
          currentUser={currentUser}
          comments={comments}
          setComments={setComments}
          original={false}
        ></CustomForm>
      ) : null}
    </>
  );
};

export default CommentComponent;
