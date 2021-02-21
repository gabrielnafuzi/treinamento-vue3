<template>
  <label class="block mb-4">
    <span class="text-lg font-medium text-gray-800">
      {{ label }}
    </span>
    <input
      :value="modelValue"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="{
        'border-brand-danger': !!errorMessage
      }"
      class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
      :placeholder="placeholder"
    />
    <span
      v-if="!!errorMessage"
      class="block font-medium text-brand-danger"
    >
      {{ errorMessage }}
    </span>
  </label>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    errorMessage: {
      type: String,
      required: false
    }
  }
}
</script>
