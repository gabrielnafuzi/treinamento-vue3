<template>
  <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
    <div class="w-28 lg:w-36">
      <img
        class="w-full"
        src="../assets/images/logo_white.png"
        alt="Logo"
      />
    </div>

    <div class="flex">
      <ul class="flex list-none">
        <li
          @click="goTo('Credentials')"
          class="px-6 py-2 mr-2 text-white font-bold rounded-full cursor-pointer focus:outline-none"
        >
          Credenciais
        </li>
        <li
          @click="goTo('Feedbacks')"
          class="px-6 py-2 mr-2 text-white font-bold rounded-full cursor-pointer focus:outline-none"
        >
          Feedbacks
        </li>

        <li
          @click="handleLogout"
          class="
            px-6 py-2 font-bold bg-white rounded-full cursor-pointer text-brand-main
            focus:outline-none"
        >
          {{ logoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useStore from '../hooks/useStore'
import { cleanCurrentUser } from '../store/user'

export default {
  setup() {
    const store = useStore('User')
    const router = useRouter()

    const logoutLabel = computed(() => {
      if (!store.currentUser.name) {
        return '...'
      }

      return `${store.currentUser.name} (sair)`
    })

    function goTo(path) {
      router.push({ name: path })
    }

    function handleLogout() {
      window.localStorage.removeItem('token')
      cleanCurrentUser()
      goTo('Home')
    }

    return {
      store,
      router,
      goTo,
      logoutLabel,
      handleLogout
    }
  }
}
</script>
