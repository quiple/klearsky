type TTUser = {
  associated?: TIAssociated
  avatar?: string
  description?: string
  did: string
  displayName: string
  handle: string
  labels?: Array<TTLabel>
  viewer: TTUserViewer
  [k: string]: unknown
}

interface TIAssociated {
  chat?: {
    allowIncoming: TTAllowIncoming
  }
  feedgens?: number
  labeler?: boolean
  lists?: number
  [k: string]: unknown
}

type TTUserViewer = {
  blockedBy?: boolean
  blocking?: string
  blockingByList?: any
  followedBy?: string
  following?: string
  muted: boolean
  mutedByList?: any
  [k: string]: unknown
}
