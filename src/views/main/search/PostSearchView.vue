<script lang="ts" setup>
import { inject, onBeforeUnmount, onMounted, reactive, watch } from "vue"
import { useRouter } from "vue-router"
import LoadButton from "@/components/buttons/LoadButton.vue"
import Post from "@/components/compositions/Post.vue"
import SVGIcon from "@/components/images/SVGIcon.vue"
import Util from "@/composables/util"

const mainState = inject("state") as MainState

const state = reactive<{
  processing: boolean
}>({
  processing: false,
})

const router = useRouter()

const unwatchOnQuery = watch(() => router.currentRoute.value.query.text, async (value: any) => {
  if (value != null) mainState.currentSearchTerm = value
  if (mainState.currentSearchTerm !== "" &&
      mainState.currentSearchPostsLastTerm !== mainState.currentSearchTerm)
    await fetchNewResults()
}, { immediate: true })

// インフィニットスクロール
const unwatchOnScroll = watch(() => mainState.scrolledToBottom, (value: boolean) => {
  if (value) fetchContinuousResults("old")
})

onMounted(async () => {
  const textbox = document.getElementById("post-term-textbox")
  if (textbox != null) textbox.focus()
  if (mainState.currentSearchTerm &&
      mainState.currentSearchPostsLastTerm !== mainState.currentSearchTerm)
    await fetchNewResults()
})

onBeforeUnmount(() => {
  unwatchOnQuery()
  unwatchOnScroll()
})

function updateSearchPostTerm (text: string) {
  const textDecoded = decodeURIComponent(text)
  if (!textDecoded || mainState.currentSearchTerm === textDecoded) return
  mainState.currentSearchTerm = textDecoded
  fetchNewResults()
}

async function fetchNewResults () {
  // 検索ワードを変えておきながら検索せずに画面遷移した場合、
  // `watch` が後から反応してしまい、ポスト検索画面に遷移してしまう不具合への対応
  if (router.currentRoute.value.name !== "post-search") return

  if (state.processing) return
  mainState.currentSearchPostsLastTerm = mainState.currentSearchTerm
  mainState.currentSearchPostResults.splice(0)
  mainState.currentSearchPostCursor = undefined
  updateRouter()
  if (!mainState.currentSearchTerm) return
  state.processing = true
  await mainState.fetchSearchPosts()
  state.processing = false
}

async function fetchContinuousResults (direction: "new" | "old") {
  Util.blurElement()
  if (state.processing) return
  if (mainState.currentSearchPostsLastTerm !== mainState.currentSearchTerm) {
    mainState.currentSearchPostsLastTerm = mainState.currentSearchTerm
    mainState.currentSearchPostResults.splice(0)
    mainState.currentSearchPostCursor = undefined
    updateRouter()
  }
  if (!mainState.currentSearchTerm) return
  state.processing = true
  await mainState.fetchSearchPosts(
    direction === "new"
      ? undefined
      : mainState.currentSearchPostCursor
  )
  state.processing = false
}

function updateRouter () {
  const query = mainState.currentSearchTerm !== ""
    ? { text: mainState.currentSearchTerm }
    : undefined
  router.push({ name: "post-search", query })
}

function updateThisPostThread (newPosts: Array<TTPost>) {
  const posts = mainState.currentSearchPostResults
  posts.forEach((oldPost: TTPost, index: number) => {
    const newPost = newPosts.find((newPost: TTPost) => oldPost.cid === newPost.cid)
    if (newPost != null) Util.updatePostProps(posts[index], newPost)
  })
}

function removeThisPost (uri: string) {
  mainState.currentSearchPostResults = mainState.currentSearchPostResults
    .filter((post: TTPost) => post.uri !== uri)
}

function openKeywordHistoryPopover ($event: Event) {
  mainState.openKeywordHistoryPopover(
    $event.target,
    mainState.currentSetting.postSearchKeywordHistory,
    (keyword: string) => {
      mainState.currentSearchTerm = keyword
      fetchNewResults()
    }
  )
}
</script>

<template>
  <div class="post-search-view">
    <Portal to="search-view-header">
      <!-- キーワードボックス -->
      <form @submit.prevent="fetchNewResults">
        <input
          v-model="mainState.currentSearchTerm"
          id="post-term-textbox"
          type="search"
          :placeholder="$t('postSearch')"
          autocapitalize="off"
          autocomplete="off"
          inputmode="search"
          spellcheck="false"
          class="textbox"
        >
      </form>

      <!-- キーワード履歴ポップオーバートリガー -->
      <button
        class="button--bordered"
        type="button"
        @click.prevent="openKeywordHistoryPopover"
      >
        <SVGIcon name="history" />
      </button>
    </Portal>
    <div class="post-search-view__main">
      <LoadButton
        direction="new"
        :processing="state.processing"
        @activate="fetchContinuousResults('new')"
      />
      <div class="post-container">
        <template
          v-for="post of mainState.currentSearchPostResults"
          :key="post.cid"
        >
          <!-- NOTICE: ミュートユーザーは非表示 -->
          <Post
            v-if="!post.author.viewer.muted && post.author.viewer.mutedByList == null"
            :position="post.__custom.forcePosition != null ? post.__custom.forcePosition as any : 'post'"
            :post="post"
            :hasReplyIcon="post.record.reply != null"
            :hasQuoteRepostIcon="post.record.embed?.record != null"
            @updateThisPostThread="updateThisPostThread"
            @removeThisPost="removeThisPost"
            @onActivateHashTag="updateSearchPostTerm"
          />
        </template>
      </div>
      <LoadButton
        direction="old"
        :processing="state.processing"
        @activate="fetchContinuousResults('old')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-search-view {
  position: relative;

  &__main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
}

.post-container {
  flex-grow: 1;
}

.post[data-position="preview"] {
  padding: 1em;
}
</style>
