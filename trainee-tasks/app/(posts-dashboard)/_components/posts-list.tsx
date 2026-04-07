"use client";

import { cn } from "@/lib/utils";
import { Post } from "@/types/posts";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
export default function UserPostsList({ posts }: { posts: Post[] }) {
  return (
    <div className="mt-6 space-y-4">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
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
