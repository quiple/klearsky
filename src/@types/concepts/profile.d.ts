type TTProfile = {
  __log?: any // Injected
  __createdAt?: string // Injected
  associated?: TIAssociated
  avatar: string
  banner: string
  description?: string
  did: string
  displayName: string
  followersCount: number
  followsCount: number
  handle: string
  indexedAt: string
  labels?: Array<TTLabel>
  postsCount: number
  viewer: TTUserViewer

  // 固定ポスト
  pinnedPost?: string

  // WhiteWind
  __whiteWinds?: Array<TICommonRecord>
}

type TTUpdateProfileParams = {
  displayName: string
  description: string
  labels: Array<string>
  avatar: null | Array<File>
  detachAvatar: Array<boolean>
  banner: null | Array<File>
  detachBanner: Array<boolean>

  // 固定ポスト
  pinnedPost?: string
}
