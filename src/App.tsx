import { useEffect, useState } from "react";
import Comment from "./components/Comment";
import { Button, TextArea, TextField } from "react-aria-components";

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
  replies: Comment[];
};

type Data = {
  currentUser: User;
  comments: Comment[];
};

function App() {
  const [data, setData] = useState<Data>({
    currentUser: {
      image: {
        png: "string",
        webp: "string",
      },
      username: "string",
    },
    comments: [
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
    ],
  });

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((info) => setData(info));
  }, []);

  console.log(data);

  return (
    <>
      <main className="bg-neutral-4 font-rubik text-neutral-2 flex flex-col gap-4 p-8 text-base font-normal">
        {data.comments.map((elem, index) => (
          <Comment key={index} {...elem} {...data.currentUser}></Comment>
        ))}
        <form
          action=""
          className="bg-neutral-5 flex flex-col gap-4 rounded-md p-4"
        >
          <TextField className="w-full">
            <TextArea
              defaultValue="Add a comment..."
              className="border-neutral-3 w-full rounded-md border-2 border-solid p-2"
            ></TextArea>
          </TextField>
          <div className="flex flex-row items-center justify-between">
            <picture className="h-8 w-8">
              <img
                src={`src/assets/${data.currentUser.image.png}`}
                alt="Avatar"
              />
            </picture>
            <Button className="bg-primary-1 text-neutral-5 rounded-md px-6 py-2 uppercase">
              Send
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}

export default App;
