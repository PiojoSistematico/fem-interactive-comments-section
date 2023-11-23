import { Button } from "react-aria-components";
import { IconDelete, IconEdit, IconMinus, IconPlus, IconReply } from "./Icons";
import { useState } from "react";

type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

type CommentProp = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: number[];
  comments: Comment[];
  currentUser: User;
};

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: number[];
};

const CommentComponent: React.FunctionComponent<CommentProp> = ({
  id,
  content,
  createdAt,
  score,
  user,
  replies,
  comments,
  currentUser,
}) => {
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  function handleReply(): void {
    setIsReplyOpen(!isReplyOpen);
  }

  return (
    <>
      <article className="flex flex-col gap-4 rounded-md bg-neutral-5 p-4">
        <div className="flex flex-row items-center gap-4">
          <picture className="h-8 w-8">
            <img src={`src/assets/${user.image.png}`} alt="Avatar" />
          </picture>
          <span className="font-medium text-neutral-1">{user.username}</span>
          {user.username == currentUser.username ? (
            <span className="bg-primary-1 px-1 text-sm text-neutral-5">
              You
            </span>
          ) : null}
          <span>{createdAt}</span>
        </div>
        <p>{content}</p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4 rounded-md bg-neutral-4 p-2">
            <Button>
              <IconPlus></IconPlus>
            </Button>
            <span className="font-medium text-primary-1">{score}</span>
            <Button>
              <IconMinus></IconMinus>
            </Button>
          </div>
          <div className="flex flex-row items-center gap-4">
            {user.username == currentUser.username ? (
              <>
                <Button className="flex flex-row items-center gap-2 font-medium text-primary-2">
                  <IconDelete></IconDelete>
                  <span>Delete</span>
                </Button>
                <Button className="flex flex-row items-center gap-2 font-medium text-primary-1">
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

      {replies && replies.length > 0 ? (
        <div className="flex flex-col gap-4 border-l-2 border-solid border-neutral-3 pl-4">
          {comments
            .filter((elem) => replies.includes(elem.id))
            .map((elem, index) => (
              <CommentComponent
                key={index}
                id={elem.id}
                content={elem.content}
                createdAt={elem.createdAt}
                score={elem.score}
                user={elem.user}
                replies={elem.replies}
                currentUser={currentUser}
                comments={comments}
              ></CommentComponent>
            ))}
        </div>
      ) : null}

      {isReplyOpen ? (
        <form
          action=""
          className="flex flex-row items-start gap-4 rounded-md bg-neutral-5 p-4"
        >
          <picture className="h-12 w-12">
            <img src={`src/assets/${currentUser.image.png}`} alt="Avatar" />
          </picture>
          <textarea
            name=""
            id=""
            className="w-full rounded-md border-2 border-solid border-neutral-3 p-2"
          ></textarea>
          <Button className="rounded-md bg-primary-1 px-4 py-1 uppercase text-neutral-5">
            Reply
          </Button>
        </form>
      ) : null}
    </>
  );
};

export default CommentComponent;
