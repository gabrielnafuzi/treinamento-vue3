<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div
    class="flex flex-col items-center justify-center h-64 bg-brand-gray"
  >
    <h1 class="text-4xl font-black text-center text-gray-800">
      Credenciais
    </h1>

    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col  w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black">
        Instalação e configuração
      </h1>

      <p class="mt-10 text-lg text-gray-800 font-regular">
        Esta aqui é a sua chave de api
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="flex py-3 pl-5 mt-2 rounded justify-between bg-brand-gray w-full lg:w-1/2"
      >
        <span v-if="state.hasErrors">Erro ao carregar a apiKey</span>

        <span v-else>{{ store.User.currentUser.apiKey }}</span>
        <div class="flex ml-20 mr-5" v-if="!state.hasErrors">
          <icon
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <icon
            @click="handleGenerateApiKey"
            name="loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber
        feedbacks
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll"
      >
        <span v-if="state.hasErrors">Erro ao carregar o script</span>
        <pre v-else>
&lt;script src="https://gabrielnafuzi-feedbacker-widget.netlify.app?api_key={{
            store.User.currentUser.apiKey
          }}"&gt;&lt;/script&gt;</pre
        >
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from '../../components/HeaderLogged.vue'
import Icon from '../../components/icons/Icon.vue'
import ContentLoader from '../../components/ContentLoader.vue'
import useStore from '../../hooks/useStore'
import colors from '../../utils/colors'
import { reactive, watch } from 'vue'
import services from '../../services'
import { setApiKey } from '../../store/user'

export default {
  components: {
    HeaderLogged,
    Icon,
    ContentLoader
  },
  setup() {
    const state = reactive({
      isLoading: false,
      hasErrors: false
    })
    const store = useStore()

    watch(
      () => store.User.currentUser,
      () => {
        if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
          handleError(true)
        }
      }
    )

    function handleError(error) {
      state.isLoading = false
      state.hasErrors = !!error
    }

    async function handleGenerateApiKey() {
      state.isLoading = true
      try {
        const { data } = await services.users.generateApiKey()

        setApiKey(data.apiKey)
      } catch (error) {
        handleError(error)
      } finally {
        state.isLoading = false
      }
    }

    return {
      state,
      store,
      handleGenerateApiKey,
      brandColors: colors.brand
    }
  }
}
</script>
