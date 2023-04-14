import type { AppBskyFeedGetTimeline, BskyAgent } from "@atproto/api"
import AtpUtil from "@/composables/atp-wrapper/atp-util"

export default async function (
  this: TIAtpWrapper,
  oldFeeds: Array<TTFeed>,
  limit?: number,
  cursor?: string
): Promise<undefined | string> {
  if (this.agent == null) return
  const query: AppBskyFeedGetTimeline.QueryParams = {
    // TODO: 要調査
    // FYI: https://github.com/bluesky-social/atproto/blob/main/packages/pds/src/app-view/api/app/bsky/util/feed.ts#L72
    algorithm: "reverse-chronological",
  }
  if (limit != null) query.limit = limit
  if (cursor != null) query.cursor = cursor
  const response: AppBskyFeedGetTimeline.Response =
    await (this.agent as BskyAgent).getTimeline(query)
  console.log("[klearsky/getTimeline]", response)
  if (!response.success) return

  // TODO:
  AtpUtil.coherentResponses(response.data.feed as Array<TTFeed>)
  AtpUtil.feed2html(response.data.feed as Array<TTFeed>)
  AtpUtil.mergeFeeds(oldFeeds, response.data.feed as Array<TTFeed>)
  AtpUtil.sortFeeds(oldFeeds)

  return response.data.cursor
}
