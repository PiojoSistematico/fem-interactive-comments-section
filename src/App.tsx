import { useEffect, useState } from "react";
import CommentComponent from "./components/Comment";
import CustomForm from "./components/CustomForm";
import { useLocalStorage } from "./hooks/useLocalStorage";
import commentsData from "./data/comments.json";
import currentUser from "./data/currentUser.json";

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
  const [comments, setComments] = useLocalStorage("data", commentsData);

  return (
    <>
      <main className="flex flex-row justify-center bg-neutral-4">
        <div className="flex flex-col gap-4 p-8 font-rubik text-base font-normal text-neutral-2 md:w-8/12 md:max-w-[1000px]">
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
        </div>
      </main>
    </>
  );
}

export default App;
