"use client";

import { Input } from "@/components/ui/input";
import { Post } from "@/types/posts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostType, createPostValidator } from "@/validators/posts";
import { useMyPostsStore } from "@/store/my-posts-store";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
type PostFormProps = {
  mode: "EDIT" | "CREATE";
  initialData?: Post;
  open: boolean;
  closeDialog: () => void;
};
export default function PostFormDialog({
  initialData,
  mode,
  open,
  closeDialog,
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostType>({
    defaultValues: {
      title: initialData?.title || "",
      body: initialData?.body || "",
    },
    resolver: zodResolver(createPostValidator),
  });
  const { addPost, editPost } = useMyPostsStore();
  function onSubmit(formData: CreatePostType) {
    const { body, title } = formData;
    if (mode === "CREATE") {
      addPost(title, body);
      closeDialog();
      reset();
      return;
    }
    if (!initialData) {
      console.error("No initial data provided for edit");
      return;
    }
    editPost(initialData.id, title, body);
    closeDialog();
    reset();
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "fixed inset-0 bg-black/30 z-50 flex justify-center items-center",
        {
          hidden: !open,
        },
      )}
    >
      <div className=" max-w-md w-full bg-white p-4 py-6 rounded-lg relative">
        <Button
          onClick={() => closeDialog()}
          size={"sm"}
          variant={"ghost"}
          className="absolute top-1 right-1 cursor-pointer"
        >
          <X />
        </Button>
        <h2 className="text-bold text-xl mb-2">
          {mode === "CREATE" ? "Create Post" : "Edit Post"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 text-sm "
          action=""
        >
          <div className="space-y-1">
            <label htmlFor="title">
              Title <span className="text-[#7996ed] text-xs">*</span>
            </label>
            <Input
              {...register("title")}
              maxLength={6}
              placeholder="Enter title for post (max chars 60)"
              id="title"
            />
            {errors.title && (
              <p className="text-xs font-medium text-[#7996ed]">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="body">
              Body <span className="text-[#7996ed] text-xs">*</span>
            </label>
            <Textarea className="min-h-30 sm:min-h-36" {...register("body")} />
            {errors.body && (
              <p className="text-xs font-medium text-[#7996ed]">
                {errors.body.message}
              </p>
            )}
          </div>
          <Button className="w-full cursor-pointer" type="submit">
            {mode === "CREATE" ? "Create Post" : "Edit Post"}
          </Button>
        </form>
      </div>
    </div>
  );
}
