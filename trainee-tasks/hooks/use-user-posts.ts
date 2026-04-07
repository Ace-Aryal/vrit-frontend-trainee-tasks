import { User } from "@/types/user";
import { Post } from "@/types/posts"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useUserPosts() {
    const BASE_URL = "https://jsonplaceholder.typicode.com"
    // 1. get all users
    function getUsers() {

        const { data, isError, isLoading, error, ...rest } = useQuery({
            queryKey: ["users"],
            queryFn: async () => {
                const res = await axios.get(`${BASE_URL}/users`)
                console.log(res.data)
                if (res.status !== 200) {
                    throw new Error("Error fetching users from server.")
                }
                // note: I have created my own type for response after observing response but we can also validate the response
                // structure with zod and get automatic type from parsed data
                return res.data as User[]
            }
        })
        return {
            users: data,
            isUsersFetchingError: isError,
            isFetchingUsers: isLoading,
            userFetchError: error,
            ...rest
        }
    }

    // 2. get user posts
    function getPostsByUserId(userId: string) {
        const { data, isLoading, isError, error, ...rest } = useQuery({
            queryKey: ["user-posts", userId],
            queryFn: async () => {
                const res = await axios.get(`${BASE_URL}/posts`, {
                    params: {
                        userId
                    }
                })
                console.log(res.data)
                if (res.status !== 200) {
                    throw new Error("Error fetching user posts.")
                }
                return res.data as Post[]
            }
        })
        return {
            posts: data,
            isPostsFetchingError: isError,
            isFetchingPosts: isLoading,
            postsFetchError: error,
            ...rest
        }
    }

    return {
        getUsers,
        getPostsByUserId
    }
}