export default class {
  public mainState: MainState
  public worker?: SharedWorker

  constructor (mainState: MainState) {
    this.mainState = mainState
    if (window.SharedWorker == null) return
    this.worker = new window.SharedWorker(
      new URL("@/worker/my-worker.ts", import.meta.url),
      {
        type: "module",
        name: "my-worker",
      }
    )
    this.worker.port.start()
    this.worker.port.onmessage = (event: MessageEvent) => {
      const data: TTPostMessageData = event.data
      console.log("[klearsky/onmessage]", data)
      switch (data.name) {
        // 全セッションキャッシュの反映
        case "getSessionCachesResponse": {
          const sessionCache: TTMyWorkerSessionCache = data.value

          // 全セッションキャッシュの反映 - プリファレンス
          if (sessionCache.currentPreferences != null) {
            mainState.currentPreferences = sessionCache.currentPreferences
          }

          // 全セッションキャッシュの反映 - ユーザープロフィール
          if (sessionCache.userProfile != null) {
            mainState.userProfile = sessionCache.userProfile
          }

          // 全セッションキャッシュの反映 - マイフィード
          if (sessionCache.currentMyFeedGenerators != null) {
            mainState.currentMyFeedGenerators = sessionCache.currentMyFeedGenerators
          }

          // 全セッションキャッシュの反映 - マイリスト
          if (sessionCache.myList != null) {
            mainState.myList = sessionCache.myList
          }

          // 全セッションキャッシュの反映 - 招待コード
          if (sessionCache.inviteCodes != null) {
            mainState.inviteCodes = sessionCache.inviteCodes
          }

          break
        }

        default: break
      }
    }
    this.worker.port.postMessage({
      name: "getSessionCachesRequest",
      did: this.mainState.atp.data.did,
    } as TTPostMessageData)
  }

  setSessionCache (key: string, value: any) {
    this.worker?.port.postMessage({
      name: "setSessionCacheRequest",
      did: this.mainState.atp.data.did,
      key: key,
      value: JSON.parse(JSON.stringify(value)),
    } as TTPostMessageData)

    // 変更をブロードキャスト
    this.mainState.broadcastChannel?.postMessage({
      name: "setSessionCacheResponse",
      did: this.mainState.atp.data.did,
      key: key,
      value: JSON.parse(JSON.stringify(value)),
    } as TTPostMessageData)
  }
}
