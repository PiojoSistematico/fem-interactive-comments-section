import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

const FormSchema = z.object({
  text: z
    .string()
    .min(3, { message: "Comment should have at least 3 characters" }),
});

type TypeSchema = z.infer<typeof FormSchema>;

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

type FormTypes = {
  type: string;
  parent?: string;
  currentUser: User;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  original: boolean;
  setIsReplyOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomForm: React.FunctionComponent<FormTypes> = ({
  type,
  parent,
  currentUser,
  comments,
  setComments,
  original,
  setIsReplyOpen,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TypeSchema>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: TypeSchema) {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newid: string = uuidv4();

    if (type == "reply") {
      const newParent: Comment = [...comments].filter(
        (elem) => elem.id == parent,
      )[0];
      newParent.replies.push(newid);

      setComments([
        ...comments.filter((elem) => elem.id != parent),
        {
          id: newid,
          content: data.text,
          createdAt: "1 min ago",
          score: 1,
          user: currentUser,
          replies: [],
          original: original,
        },
        newParent,
      ]);

      setIsReplyOpen(false);
    } else {
      setComments([
        ...comments,
        {
          id: newid,
          content: data.text,
          createdAt: "1 min ago",
          score: 1,
          user: currentUser,
          replies: [],
          original: original,
        },
      ]);
    }
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      className="flex flex-col gap-4 rounded-md bg-neutral-5 p-4"
    >
      <input
        {...register("text")}
        placeholder="Add a comment..."
        type="text"
        className="w-full rounded-md border-2 border-solid border-neutral-3 p-2"
      ></input>
      {errors.text && (
        <p className="p-1 text-sm text-primary-2">{errors.text.message}</p>
      )}
      <div className="flex flex-row items-center justify-between">
        <picture className="h-8 w-8">
          <img src={`src/assets/${currentUser.image.png}`} alt="Avatar" />
        </picture>
        <button
          disabled={isSubmitting}
          type="submit"
          className="rounded-md bg-primary-1 px-6 py-2 uppercase text-neutral-5 disabled:bg-neutral-2"
        >
          {type == "reply" ? "reply" : type == "edit" ? "update" : "send"}
        </button>
      </div>
    </form>
  );
};

export default CustomForm;
