"use client";

import { cn } from "@/lib/utils";
import { Post } from "@/types/posts";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function UserPostsList({ posts }: { posts: Post[] }) {
  // this component uses client side pagination for list rendering optimization only, not backend controlled pagination
  const [currentPage, setCurrentPage] = useState(1);
  const PAGINATION_LIMIT = 4;
  const offset = (currentPage - 1) * PAGINATION_LIMIT;
  const totalPages =
    posts.length === 0 ? 0 : Math.ceil(posts.length / PAGINATION_LIMIT);
  const currentPagePosts = posts.slice(offset, offset + PAGINATION_LIMIT);
  return (
    <div className="mt-6 space-y-4">
      {currentPagePosts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <div className="flex  justify-between text-sm">
        <p>
          Page {currentPage} / {totalPages}
        </p>
        <div className="flex gap-2 items-center ">
          <Button
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage((prev) => prev - 1);
              }
            }}
            disabled={currentPage === 1}
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
            disabled={currentPage === totalPages}
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
  return (
    // semantic article tag
    <article
      onClick={() => setIsCollapsed((prev) => !prev)}
      key={post.id}
      className="rounded-xl border border-border/80 bg-card p-4 shadow-sm cursor-pointer"
    >
      <div className="flex items-center justify-between ">
        <h2 className="text-base font-bold sm:text-lg flex-1">{post.title}</h2>
        <motion.button
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
          "mt-3 text-sm font-sans leading-6 text-muted-foreground sm:text-base line-clamp-1 trainsition-all",
          !isCollapsed && "line-clamp-none",
        )}
      >
        {post.body}
      </pre>
    </article>
  );
}
