type TTSetting = {
  autoTranslation?: boolean
  autoTranslationIgnoreLanguage?: string
  backgroundImage?: string
  backgroundOpacity?: number
  colorTheme?: string
  contentLanguages?: Array<string>
  fontSize?: string
  fontKerning?: boolean
  fontAntialiasing?: boolean
  globallineLayout?: "post" | "slim"
  hideNotificationBadge?: boolean
  hideNumberOfReaction?: boolean
  imageAspectRatio?: string
  imageMaxHeight?: number
  imageOption?: Array<number>
  imageFolding?: "none" | "recommended" | "all"
  imageAutoPlay?: boolean
  lightning?: string
  linkcardEmbeddedControl?: Array<string>
  mainAreaOpacity?: number
  myFeedsIndex?: Array<string>
  notificationFetchInterval?: number
  postAnonymization?: boolean
  postLanguages?: Array<string>
  replyFolding?: Array<number>
  repostFolding?: Array<number>
  tags?: Array<TTMyTag>
  timeControl?: string
  uiLanguage?: string
  wordMute?: Array<TTWordMute>
  [k: string]: any
}
