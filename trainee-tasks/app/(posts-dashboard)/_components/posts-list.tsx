"use client";

import { cn } from "@/lib/utils";
import { Post } from "@/types/posts";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  PenBox,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import PostFormDialog from "./post-form";
import { useMyPostsStore } from "@/store/my-posts-store";

export default function UserPostsList({ posts }: { posts: Post[] }) {
  // this component uses client side pagination for list rendering optimization only, not backend controlled pagination
  const [currentPage, setCurrentPage] = useState(1);
  const PAGINATION_LIMIT = 4;
  const offset = (currentPage - 1) * PAGINATION_LIMIT;
  const totalPages =
    posts.length === 0 ? 0 : Math.ceil(posts.length / PAGINATION_LIMIT);
  const currentPagePosts = posts.slice(offset, offset + PAGINATION_LIMIT);
  return (
    <div className="mt-6 space-y-4 ">
      {currentPagePosts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <div className="flex  justify-between text-sm">
        <p>
          Page {totalPages === 0 ? 0 : currentPage} / {totalPages}
        </p>
        <div className="flex gap-2 items-center ">
          <Button
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage((prev) => prev - 1);
              }
            }}
            disabled={currentPage <= 1}
            size={"sm"}
            variant={"outline"}
          >
            <ChevronLeft /> Prev
          </Button>

          <Button
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage((prev) => prev + 1);
              }
            }}
            disabled={currentPage === totalPages || totalPages === 0}
            size={"sm"}
            variant={"outline"}
          >
            <ChevronRight /> Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isEditFormDialogOpen, setIsEditDialogOpen] = useState(false);
  const { deletePost } = useMyPostsStore();
  return (
    // semantic article tag
    <article
      onClick={() => setIsCollapsed((prev) => !prev)}
      key={post.id}
      className="rounded-xl border border-border/80 bg-card p-4 shadow-sm cursor-pointer"
    >
      <div className="flex items-center justify-between gap-1 ">
        <h2 className="text-base font-bold sm:text-lg flex-1">{post.title}</h2>
        {post.userId === "me" && (
          <>
            {" "}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                deletePost(post.id);
              }}
              size={"sm"}
              variant={"ghost"}
              className="cursor-pointer"
            >
              <Trash2 className="text-red-600 " />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditDialogOpen(true);
              }}
              size={"sm"}
              variant={"ghost"}
              className="cursor-pointer"
            >
              <PenBox className="text-blue-500 " />
            </Button>
          </>
        )}
        <motion.button
          className="cursor-pointer"
          initial={{
            rotate: 0,
          }}
          animate={
            isCollapsed
              ? {
                  rotate: 0,
                }
              : {
                  rotate: 180,
                }
          }
        >
          <ChevronDown size={20} className="text-gray-500" />
        </motion.button>
      </div>
      <pre
        className={cn(
          "mt-3 text-sm font-sans leading-6 text-muted-foreground sm:text-base line-clamp-1 whitespace-pre-wrap",
          !isCollapsed && "line-clamp-none",
        )}
      >
        {post.body}
      </pre>
      <PostFormDialog
        closeDialog={() => setIsEditDialogOpen(false)}
        mode="EDIT"
        initialData={post}
        open={isEditFormDialogOpen}
      />
    </article>
  );
}
