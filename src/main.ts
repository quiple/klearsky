import "@/scss/main.scss"

import { createApp } from "vue"
import PortalVue from "portal-vue"
import App from "@/App.vue"
import i18n from "@/plugins/i18n"
import IntersectionObserverDirective from "@/plugins/intersection-observer-directive"
import router from "@/router"
import Util from "@/composables/util"

// 翻訳
import translationEn from "@/translations/en.json"
import translationJa from "@/translations/ja.json"
import translationKo from "@/translations/ko.json"

Util.proxyFetch()

const app = createApp(App)
app.use(router)
app.use(PortalVue)
app.directive("intersection-observer", IntersectionObserverDirective)

// 翻訳
const translations = {
  en: translationEn,
  ja: translationJa,
  ko: translationKo,
}
app.use(i18n, translations)

app.mount("#app")
