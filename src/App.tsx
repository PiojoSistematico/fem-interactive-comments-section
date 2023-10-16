import { useEffect, useState } from "react";

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
      <main>
        <article>
          {data.comments.map((elem) => (
            <p>{elem.content}</p>
          ))}
        </article>
      </main>
    </>
  );
}

export default App;
