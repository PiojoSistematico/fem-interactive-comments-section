import { Button } from "react-aria-components";
import { IconDelete, IconEdit, IconMinus, IconPlus, IconReply } from "./Icons";

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
  replies?: CommentProp[];
};

const Comment: React.FunctionComponent<CommentProp & User> = ({
  id,
  content,
  createdAt,
  score,
  user,
  replies,
  image,
  username,
}) => {
  return (
    <>
      <article className="bg-neutral-5 flex flex-col gap-4 rounded-md p-4">
        <div className="flex flex-row items-center gap-4">
          <picture className="h-8 w-8">
            <img src={`src/assets/${user.image.png}`} alt="Avatar" />
          </picture>
          <span className="text-neutral-1 font-medium">{user.username}</span>
          {user.username == username ? (
            <span className="bg-primary-1 text-neutral-5 px-1 text-sm">
              You
            </span>
          ) : null}
          <span>{createdAt}</span>
        </div>
        <p>{content}</p>
        <div className="flex flex-row items-center justify-between">
          <div className="bg-neutral-4 flex flex-row items-center gap-4 rounded-md p-2">
            <Button>
              <IconPlus></IconPlus>
            </Button>
            <span className="text-primary-1 font-medium">{score}</span>
            <Button>
              <IconMinus></IconMinus>
            </Button>
          </div>
          <div className="flex flex-row items-center gap-4">
            {user.username == username ? (
              <>
                <Button className="text-primary-2 flex flex-row items-center gap-2 font-medium">
                  <IconDelete></IconDelete>
                  <span>Delete</span>
                </Button>
                <Button className="text-primary-1 flex flex-row items-center gap-2 font-medium">
                  <IconEdit></IconEdit>
                  <span>Edit</span>
                </Button>
              </>
            ) : (
              <Button className="text-primary-1 flex flex-row items-center gap-2 font-medium">
                <IconReply></IconReply>
                <span>Reply</span>
              </Button>
            )}
          </div>
        </div>
      </article>

      {replies && replies.length > 0 ? (
        <div className="border-neutral-3 flex flex-col gap-4 border-l-2 border-solid pl-4">
          {replies.map((elem, index) => (
            <Comment
              key={index}
              {...elem}
              image={image}
              username={username}
            ></Comment>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Comment;
