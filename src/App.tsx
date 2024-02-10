import { useEffect, useState } from "react";
import CommentComponent from "./components/Comment";
import CustomForm from "./components/CustomForm";

type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
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

function App() {
  const [currentUser, setCurrentUser] = useState<User>({
    image: {
      png: "string",
      webp: "string",
    },
    username: "string",
  });

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "string",
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
      original: true,
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

  /*   console.log("user>>>", currentUser);
  console.log("comments>>>", comments);
  console.log(
    "filter>>>",
    comments.filter((elem) => thread.includes(elem.id)),
  ); */

  return (
    <>
      <main className="flex flex-col gap-4 bg-neutral-4 p-8 font-rubik text-base font-normal text-neutral-2">
        {comments
          .filter((elem) => elem.original == true)
          .map((elem, index) => (
            <CommentComponent
              key={index}
              id={elem.id}
              currentUser={currentUser}
              comments={comments}
              setComments={setComments}
            ></CommentComponent>
          ))}
        <CustomForm
          type="default"
          currentUser={currentUser}
          comments={comments}
          setComments={setComments}
          original={true}
        ></CustomForm>
      </main>
    </>
  );
}

export default App;
