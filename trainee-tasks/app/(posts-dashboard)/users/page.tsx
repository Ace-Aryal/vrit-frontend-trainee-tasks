"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserPosts } from "@/hooks/use-user-posts";
import { AlertCircle, Inbox, RefreshCw, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const { getUsers } = useUserPosts();
  const {
    users,
    isUsersFetchingError,
    isFetchingUsers,
    userFetchError,
    refetch,
  } = getUsers();

  const [filteredUsers, setFiltereUsers] = useState(users || []);
  const [search, setSearch] = useState("");
  function filterUsers(search: string) {
    if (!users) {
      return [];
    }
    const searchText = search.trim().toLowerCase();
    if (!search) {
      setFiltereUsers(users || []);
      return;
    }
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().startsWith(searchText) ||
        user.email.toLowerCase().startsWith(searchText),
    );
    setFiltereUsers(filteredUsers);
  }
  useEffect(() => {
    if (users) {
      setFiltereUsers(users);
    }
  }, [users?.length]);
  useEffect(() => {
    filterUsers(search);
  }, [search]);
  if (isFetchingUsers) {
    return (
      <section className="mx-auto max-w-6xl sm:px-4 py-8">
        <PageHeading />
        <UsersTableSkeleton />
      </section>
    );
  }

  if (isUsersFetchingError) {
    return (
      <section className="mx-auto max-w-6xl sm:px-4 py-8">
        <PageHeading />
        <div className="mx-auto mt-6 max-w-lg rounded-2xl border border-destructive/30 bg-destructive/5 p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-destructive/15 p-2 text-destructive">
              <AlertCircle className="size-5" />
            </div>
            <h2 className="text-lg font-semibold">Failed to load users</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {userFetchError?.message ||
              "Error fetching user data , Please retry."}
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

  return (
    <section className="mx-auto max-w-6xl sm:px-4 py-4 sm:py-8">
      <PageHeading />
      {/* search bar */}
      <Input
        type="search"
        className="w-full max-w-sm mt-2"
        placeholder="Search user via email or name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mt-6 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <TableHead />
          <tbody>
            {!filteredUsers.length ? (
              <tr>
                <td colSpan={4} className="p-0">
                  <div className="flex flex-col items-center justify-center gap-3 px-4 py-14 text-center">
                    <div className="rounded-full bg-muted p-3 text-muted-foreground">
                      <Inbox className="size-5" />
                    </div>
                    <h3 className="text-base font-semibold">No users found</h3>
                    <p className="max-w-md text-sm text-muted-foreground">
                      There are no users to display at the moment.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredUsers?.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-border/60 transition-colors hover:bg-muted/40 "
                >
                  <td className="pl-4 px-3  sm:px-5 py-4 font-medium">
                    {user.name}
                  </td>
                  <td className="px-3 sm:px-5 py-4 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-3 sm:px-5 py-4 text-muted-foreground">
                    {user.company.name}
                  </td>
                  <td className="pr-4 px-3 sm:px-5 py-4">
                    <Button asChild className="cursor-pointer" size="sm">
                      <Link href={`/users/${user.id}?name=${user.name}`}>
                        View posts
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
// re using page heading in each state
function PageHeading() {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Posts Dashboard
        </p>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <Users className="size-5" />
          Users Directory
        </h1>
      </div>
    </div>
  );
}
// reusuing table head in user table and skeleton
function TableHead() {
  return (
    <thead className="bg-muted/50">
      <tr className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        <th className="px-5 py-3">Name</th>
        <th className="px-5 py-3">Email</th>
        <th className="px-5 py-3">Company</th>
        <th className="px-5 py-3">Action</th>
      </tr>
    </thead>
  );
}

function UsersTableSkeleton() {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
      <table className="w-full text-left ">
        <TableHead />
        <tbody>
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index} className="border-t border-border/60">
              <td className="px-5 py-4">
                <div className="h-4 w-20 sm:w-36 animate-pulse rounded bg-muted" />
              </td>
              <td className="px-5 py-4">
                <div className="h-4 w-24 sm:w-56 animate-pulse rounded bg-muted" />
              </td>
              <td className="px-5 py-4">
                <div className="h-4 w-24 sm:w-40 animate-pulse rounded bg-muted" />
              </td>
              <td className="px-5 py-4">
                <div className="h-8 w-10 sm:w-24 animate-pulse rounded-md bg-muted" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
