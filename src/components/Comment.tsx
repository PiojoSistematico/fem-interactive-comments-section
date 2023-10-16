import iconReply from "../assets/images/icon-reply.svg";
import iconPlus from "../assets/images/icon-plus.svg";
import iconMinus from "../assets/images/icon-minus.svg";
import iconDelete from "../assets/images/icon-delete.svg";

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
  replies: Comment[];
};

const Comment: React.FunctionComponent<CommentProp> = ({
  id,
  content,
  createdAt,
  score,
  user,
  replies,
}) => {
  return (
    <article>
      <div>
        <picture>
          <img src={user.image.png} alt="Avatar" />
        </picture>
        <span>{user.username}</span>
        <span>{createdAt}</span>
      </div>
      <p>{content}</p>
      <div>
        <div>
          <button>
            <img src={iconPlus} alt="Increment" />
          </button>
          <span>{score}</span>
          <button>
            <img src={iconMinus} alt="Decrement" />
          </button>
        </div>
        <div>
          <button>
            <img src={iconDelete} alt="Delete" />
          </button>
          <button>
            <img src={iconReply} alt="Reply" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default Comment;
