
export type Post = {
    userId: string,
    id: string,
    title: string,
    // note: body is not normal string it can contain newlines , tabs etc.
    body: string
}