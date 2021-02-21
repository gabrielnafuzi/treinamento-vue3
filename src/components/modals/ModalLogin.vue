<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">
      Entre na sua conta
    </h1>

    <button
      class="text-4xl text-gray-600 focus:outline-none"
      @click="close"
    >
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <base-input
        v-model="state.email.value"
        type="email"
        label="E-mail"
        placeholder="john.doe@gmail.com"
        :errorMessage="state.email.errorMessage"
      />
      <base-input
        v-model="state.password.value"
        type="password"
        label="Senha"
        placeholder="*****"
        :errorMessage="state.password.errorMessage"
      />

      <button
        :disabled="state.isLoading"
        type="submit"
        :class="{
          'opacity-50': state.isLoading
        }"
        class="
          px-8 py-3 mt-10
          text-2xl font-bold text-white
          rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        <icon
          v-if="state.isLoading"
          name="loading"
          class="animate-spin"
        />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script>
import Icon from '../icons/Icon.vue'
import BaseInput from '../inputs/BaseInput.vue'

import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import useModal from '../../hooks/useModal'
import services from '../../services'
import {
  validateEmptyAndLength3,
  validateEmptyAndEmail
} from '../../utils/validators'

export default {
  components: {
    Icon,
    BaseInput
  },
  setup() {
    const router = useRouter()
    const modal = useModal()
    const toast = useToast()
    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function handleSubmit() {
      state.isLoading = true
      toast.clear()

      try {
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          window.localStorage.setItem('token', data.token)
          router.push({ name: 'Feedbacks' })
          modal.close()
          return
        }

        if (errors.status === 404) {
          toast.error('E-mail não encontrado')
        }

        if (errors.status === 401) {
          toast.error('E-mail/Senha inválidos')
        }

        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao fazer o  login')
        }
      } catch (error) {
        state.hasErrors = !!error
        toast.error('Ocorreu um erro ao fazer o  login')
      } finally {
        state.isLoading = false
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>
