import type { AppBskyFeedSearchPosts, BskyAgent } from "@atproto/api"
import Util from "@/composables/util"

export default async function (
  this: TIAtpWrapper,
  currentPosts: Array<TTPost>,
  q: string,
  limit?: number,
  cursor?: string
): Promise<Error | undefined | string> {
  if (this.agent == null) return Error("noAgentError")
  const query: AppBskyFeedSearchPosts.QueryParams = { q }
  if (limit != null) query.limit = limit
  if (cursor != null) query.cursor = cursor
  const response: AppBskyFeedSearchPosts.Response =
    await (this.agent as BskyAgent).app.bsky.feed.searchPosts(query)
      .then((value: AppBskyFeedSearchPosts.Response) => value)
      .catch((error: any) => error)
  console.log("[klearsky/fetchPostSearch]", response)
  if (!response.success) return Error("apiError")
  const newPosts: Array<TTPost> = (response.data.posts as Array<TTPost>)
    .filter((post: TTPost) => {
      return currentPosts.every((currentPost: TTPost) => {
        return currentPost.cid !== post.cid
      })
    })

  // TODO:
  Util.sanitizePostsOrFeeds(newPosts)

  if (cursor == null) {
    currentPosts.unshift(...newPosts)
  } else {
    currentPosts.push(...newPosts)
  }
  return response.data.cursor
}
