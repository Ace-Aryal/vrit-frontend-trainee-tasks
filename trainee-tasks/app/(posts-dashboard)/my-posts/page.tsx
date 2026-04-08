"use client";
import { useMyPostsStore } from "@/store/my-posts-store";
import UserPostsList from "../_components/posts-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText } from "lucide-react";
import PostFormDialog from "../_components/post-form";
import { useState } from "react";

// my-posts follows same post format as users post but it keeps post in zustand store
export default function Page() {
  const { posts } = useMyPostsStore();

  const [isCreateFormDialogOpen, setIsCreateDialogOpen] = useState(false);
  return (
    <div className="max-w-3xl mx-auto sm:px-4 sm:py-6">
      <div className="flex items-center justify-between ">
        <p className="text-xs font-medium tracking-[0.2rem] text-muted-foreground uppercase flex-1">
          My Posts
        </p>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="h-7 cursor-pointer"
        >
          Create Post
        </Button>
      </div>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">My Posts</h1>
      <div className="mt-6">
        {posts.length === 0 ? <EmptyState /> : <UserPostsList posts={posts} />}
      </div>
      {/* create dialog */}
      <PostFormDialog
        open={isCreateFormDialogOpen}
        mode="CREATE"
        closeDialog={() => setIsCreateDialogOpen(false)}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-6 flex flex-col items-center rounded-2xl border border-border/80 bg-card px-5 py-12 text-center shadow-sm">
      <div className="rounded-full bg-muted p-3 text-muted-foreground">
        <FileText className="size-5" />
      </div>
      <h2 className="mt-4 text-lg font-semibold">No posts found</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        You have no posts to display yet.
      </p>
    </div>
  );
}
