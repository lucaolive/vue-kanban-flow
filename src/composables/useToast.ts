import { ref } from 'vue'

const message = ref('')
const type = ref<'success' | 'error' | ''>('')
let timeoutId: number

export function useToast() {
  function showToast(msg: string, t: 'success' | 'error' = 'success') {
    message.value = msg
    type.value = t

    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      message.value = ''
    }, 3000)
  }

  return { message, type, showToast }
}
