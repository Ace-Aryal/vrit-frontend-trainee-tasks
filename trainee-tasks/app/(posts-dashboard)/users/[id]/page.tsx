"use client";

import { Button } from "@/components/ui/button";
import { useUserPosts } from "@/hooks/use-user-posts";

import {
  AlertCircle,
  ArrowLeft,
  ChevronDown,
  FileText,
  RefreshCw,
} from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";

import UserPostsList from "../../_components/posts-list";
import Link from "next/link";
export default function UserPostsPage() {
  const { id: userId } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const { getPostsByUserId } = useUserPosts();
  const {
    posts,
    isFetchingPosts,
    isPostsFetchingError,
    postsFetchError,
    refetch,
  } = getPostsByUserId(userId);
  // loading state
  if (isFetchingPosts) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-8">
        <PageHeading username={username} />
        {/* skeleton */}
        <ListSkeleton />
      </section>
    );
  }
  // error handling
  if (isPostsFetchingError) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-8">
        <PageHeading username={username} />
        <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-destructive/15 p-2 text-destructive">
              <AlertCircle className="size-5" />
            </div>
            <h2 className="text-lg font-semibold">Could not load posts</h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {postsFetchError?.message || "Please retry to fetch user posts."}
          </p>
          <Button
            className="mt-5 cursor-pointer"
            onClick={() => refetch()}
            variant="destructive"
          >
            <RefreshCw />
            Retry
          </Button>
        </div>
      </section>
    );
  }
  // empty state
  if (posts?.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-8">
        <PageHeading username={username} />
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-border/80 bg-card px-5 py-12 text-center shadow-sm">
          <div className="rounded-full bg-muted p-3 text-muted-foreground">
            <FileText className="size-5" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">No posts found</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            This user has no posts to display yet.
          </p>
        </div>
      </section>
    );
  }
  // main content
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <PageHeading username={username} />
      <div className="mt-6 space-y-4">
        <UserPostsList posts={posts || []} />
      </div>
    </section>
  );
}
//  re using
function PageHeading({ username }: { username: string | null }) {
  return (
    <div>
      <div className="flex items-center justify-between ">
        <p className="text-xs font-medium tracking-[0.2rem] text-muted-foreground uppercase flex-1">
          User Posts
        </p>
        <Link
          className="flex gap-1.5 items-center text-sm text-gray-600"
          href={"/users"}
        >
          <ArrowLeft className="h-4 w-8" />
          <span>Go Back</span>
        </Link>
      </div>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">
        {username ? `${username}'s posts` : "Posts"}
      </h1>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="mt-6 space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-border/80 bg-card p-5 shadow-sm"
        >
          <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
          <div className="mt-4 h-4 w-full animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-11/12 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
