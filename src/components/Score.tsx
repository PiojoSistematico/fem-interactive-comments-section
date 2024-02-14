import React from "react";
import { Button } from "react-aria-components";
import { IconMinus, IconPlus } from "./Icons";

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: string[];
  original: boolean;
};

type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

type ScoreTypes = {
  id: string;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const Score: React.FunctionComponent<ScoreTypes> = ({
  id,
  comments,
  setComments,
}) => {
  const comment = comments.filter((elem) => elem.id == id)[0];

  function changeScore(change: number): void {
    setComments([
      ...comments.filter((elem) => elem.id != id),
      {
        ...comment,
        score: comment.score + change,
      },
    ]);
  }

  return (
    <div className="flex flex-row items-center gap-4 rounded-md bg-neutral-4 p-2 md:absolute md:top-4 md:flex-col">
      <Button onPress={() => changeScore(1)}>
        <IconPlus></IconPlus>
      </Button>
      <span className="font-medium text-primary-1">{comment.score}</span>
      <Button onPress={() => changeScore(-1)}>
        <IconMinus></IconMinus>
      </Button>
    </div>
  );
};

export default Score;
