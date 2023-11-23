import { useEffect, useState } from "react";
import { Button, TextArea, TextField } from "react-aria-components";
import CommentComponent from "./components/Comment";

type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: number[];
};

function App() {
  const [thread, setThread] = useState([1, 2]);

  const [currentUser, setCurrentUser] = useState<User>({
    image: {
      png: "string",
      webp: "string",
    },
    username: "string",
  });

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      content: "string",
      createdAt: "string",
      score: 1,
      user: {
        image: {
          png: "string",
          webp: "string",
        },
        username: "string",
      },
      replies: [],
    },
  ]);

  useEffect(() => {
    fetch("currentUser.json")
      .then((res) => res.json())
      .then((info) => setCurrentUser(info));
    fetch("comments.json")
      .then((res) => res.json())
      .then((info) => setComments(info));
  }, []);

  console.log("user>>>", currentUser);
  console.log("comments>>>", comments);
  console.log(
    "filter>>>",
    comments.filter((elem) => thread.includes(elem.id)),
  );

  function addNewComment(e): void {
    e.preventDefault();
    console.log(e);
    setComments([
      ...comments,
      {
        id: 1,
        content: e.target.content.value,
        createdAt: "1 min ago",
        score: 1,
        user: currentUser,
        replies: [],
      },
    ]);
  }

  return (
    <>
      <main className="flex flex-col gap-4 bg-neutral-4 p-8 font-rubik text-base font-normal text-neutral-2">
        {comments
          .filter((elem) => thread.includes(elem.id))
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
        <form
          onSubmit={addNewComment}
          action=""
          className="flex flex-col gap-4 rounded-md bg-neutral-5 p-4"
        >
          <textarea
            placeholder="Add a comment..."
            name="content"
            className="w-full rounded-md border-2 border-solid border-neutral-3 p-2"
          ></textarea>
          <div className="flex flex-row items-center justify-between">
            <picture className="h-8 w-8">
              <img src={`src/assets/${currentUser.image.png}`} alt="Avatar" />
            </picture>
            <Button
              type="submit"
              className="rounded-md bg-primary-1 px-6 py-2 uppercase text-neutral-5"
            >
              Send
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}

export default App;
