import { Post } from "@/types/posts"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type MyStore = {
    posts: Post[],
    addPost: (title: string, body: string) => void,
    editPost: (id: string, title: string, body: string) => void,
    deletePost: (id: string) => void
}
export const useMyPostsStore = create<MyStore>()(persist((set, get) => ({
    posts: [],
    addPost: (title, body) => {
        const id = String(Date.now())
        const newPost: Post = { body, title, userId: "me", id }
        set((state) => ({ posts: [newPost, ...state.posts] }))
    },
    editPost: (id, title, body) => {
        const notEditedPosts = get().posts.filter((post) => post.id !== id)
        const newPost: Post = { body, title, id, userId: "me" }
        set((_) => ({ posts: [newPost, ...notEditedPosts] }))
    },
    deletePost: (id) => {
        const notDeletedPosts = get().posts.filter((post) => post.id !== id)
        set((_) => ({ posts: notDeletedPosts }))
    },

}), {
    name: "my-posts-storage"
}))