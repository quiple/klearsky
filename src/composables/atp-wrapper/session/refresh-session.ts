import Util from "@/composables/util"

export default async function (this: TIAtpWrapper): Promise<boolean> {
  const session = this.data.sessions[this.data.did]
  if (session == null) return false

  // TODO: 本来は @atproto/api の `com.atproto.server.refreshSession` を使用するべきだが、
  //       不明なエラーが発生するため直接サーバを叩いている。原因がわかり次第差し替えること
  const url = `https://${session.__serviceName}/xrpc/com.atproto.server.refreshSession`
  const request: RequestInit = {
    method: "POST",
    headers: { "Authorization": `Bearer ${session.refreshJwt}` },
  }
  const json: any = await fetch(url, request).then(async (response: Response) => {
    console.log("[klearsky/refreshSession]", response)
    if (!response.ok) return undefined
    return await response.json()
  })

  if (json?.did == null) return false
  this.data.did = json.did
  this.resetSession(json)

  // TODO:
  Util.saveStorage("atp", this.data)

  return true
}
