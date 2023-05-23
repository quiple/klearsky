import createAgent from "@/composables/atp-wrapper/create-agent"
import createFileBlob from "@/composables/atp-wrapper/create-file-blob"
import createFollow from "@/composables/atp-wrapper/create-follow"
import createLike from "@/composables/atp-wrapper/create-like"
import createPost from "@/composables/atp-wrapper/create-post"
import createRepost from "@/composables/atp-wrapper/create-repost"
import deleteAccount from "@/composables/atp-wrapper/delete-account"
import deleteFollow from "@/composables/atp-wrapper/delete-follow"
import deleteLike from "@/composables/atp-wrapper/delete-like"
import deletePost from "@/composables/atp-wrapper/delete-post"
import deleteRepost from "@/composables/atp-wrapper/delete-repost"
import deleteSession from "@/composables/atp-wrapper/delete-session"
import disableBlock from "@/composables/atp-wrapper/disable-block"
import disableMute from "@/composables/atp-wrapper/disable-mute"
import enableBlock from "@/composables/atp-wrapper/enable-block"
import enableMute from "@/composables/atp-wrapper/enable-mute"
import fetchAuthorFeed from "@/composables/atp-wrapper/fetch-author-feed"
import fetchAuthorReposts from "@/composables/atp-wrapper/fetch-author-reposts"
import fetchAuthorLikes from "@/composables/atp-wrapper/fetch-author-likes"
import fetchBlob from "@/composables/atp-wrapper/fetch-blob"
import fetchBlockingUsers from "@/composables/atp-wrapper/fetch-blocking-users"
import fetchFirstPost from "@/composables/atp-wrapper/fetch-first-post"
import fetchFollowers from "@/composables/atp-wrapper/fetch-followers"
import fetchFollowings from "@/composables/atp-wrapper/fetch-followings"
import fetchHotFeeds from "@/composables/atp-wrapper/fetch-hot-feeds"
import fetchInviteCodes from "@/composables/atp-wrapper/fetch-invite-codes"
import fetchLikeUsers from "@/composables/atp-wrapper/fetch-like-users"
import fetchKeywordSearch from "@/composables/atp-wrapper/fetch-keyword-search"
import fetchLabels from "@/composables/atp-wrapper/fetch-labels"
import fetchMutingUsers from "@/composables/atp-wrapper/fetch-muting-users"
import fetchNotificationCount from "@/composables/atp-wrapper/fetch-notification-count"
import fetchNotifications from "@/composables/atp-wrapper/fetch-notifications"
import fetchPosts from "@/composables/atp-wrapper/fetch-posts"
import fetchPostThread from "@/composables/atp-wrapper/fetch-post-thread"
import fetchPreferences from "@/composables/atp-wrapper/fetch-preferences"
import fetchProfile from "@/composables/atp-wrapper/fetch-profile"
import fetchRepostUsers from "@/composables/atp-wrapper/fetch-repost-users"
import fetchSuggestions from "@/composables/atp-wrapper/fetch-suggestions"
import fetchTimeline from "@/composables/atp-wrapper/fetch-timeline"
import fetchUserSearch from "@/composables/atp-wrapper/fetch-user-search"
import login from "@/composables/atp-wrapper/login"
import logout from "@/composables/atp-wrapper/logout"
import refreshSession from "@/composables/atp-wrapper/refresh-session"
import resumeSession from "@/composables/atp-wrapper/resume-session"
import updateNotificationSeen from "@/composables/atp-wrapper/update-notification-seen"
import updatePreferences from "@/composables/atp-wrapper/update-preferences"
import updateProfile from "@/composables/atp-wrapper/update-profile"
import Util from "@/composables/util/index"

// @ts-ignore // TODO:
class AtpWrapper implements TIAtpWrapper {
  // @ts-ignore // TODO:
  constructor(this: TIAtpWrapper) {
    this.agent = null
    this.data = Util.loadStorage("atp") ?? {
      did: "",
      sessions: {},
    }
    this.session = undefined
    this.lastFetchNotificationsDate = undefined
  }
}

const prototype = AtpWrapper.prototype as unknown as TIAtpWrapper
prototype.canLogin = function (this: TIAtpWrapper): boolean {
  return this.data.sessions[this.data.did] != null
}
prototype.hasLogin = function (this: TIAtpWrapper): boolean {
  return this.session != null
}
prototype.createAgent = createAgent
prototype.createFileBlob = createFileBlob
prototype.createFollow = createFollow
prototype.createLike = createLike
prototype.createPost = createPost
prototype.createRepost = createRepost
prototype.deleteAccount = deleteAccount
prototype.deleteFollow = deleteFollow
prototype.deleteLike = deleteLike
prototype.deletePost = deletePost
prototype.deleteRepost = deleteRepost
prototype.deleteSession = deleteSession
prototype.disableBlock = disableBlock
prototype.disableMute = disableMute
prototype.enableBlock = enableBlock
prototype.enableMute = enableMute
prototype.fetchAuthorFeed = fetchAuthorFeed
prototype.fetchAuthorReposts = fetchAuthorReposts
prototype.fetchAuthorLikes = fetchAuthorLikes
prototype.fetchBlob = fetchBlob
prototype.fetchBlockingUsers = fetchBlockingUsers
prototype.fetchFirstPost = fetchFirstPost
prototype.fetchFollowers = fetchFollowers
prototype.fetchFollowings = fetchFollowings
prototype.fetchHotFeeds = fetchHotFeeds
prototype.fetchInviteCodes = fetchInviteCodes
prototype.fetchKeywordSearch = fetchKeywordSearch
prototype.fetchLabels = fetchLabels
prototype.fetchMutingUsers = fetchMutingUsers
prototype.fetchNotificationCount = fetchNotificationCount
prototype.fetchNotifications = fetchNotifications
prototype.fetchPosts = fetchPosts
prototype.fetchPostThread = fetchPostThread
prototype.fetchPreferences = fetchPreferences
prototype.fetchProfile = fetchProfile
prototype.fetchRepostUsers = fetchRepostUsers
prototype.fetchLikeUsers = fetchLikeUsers
prototype.fetchSuggestions = fetchSuggestions
prototype.fetchTimeline = fetchTimeline
prototype.fetchUserSearch = fetchUserSearch
prototype.login = login
prototype.logout = logout
prototype.refreshSession = refreshSession
prototype.resumeSession = resumeSession
prototype.saveData = function (this: TIAtpWrapper) {
  Util.saveStorage("atp", this.data)
}
prototype.updateNotificationSeen = updateNotificationSeen
prototype.updatePreferences = updatePreferences
prototype.updateProfile = updateProfile

export default AtpWrapper
