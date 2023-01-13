import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
	// state
	const isHelpVisible = ref(false)
	// getters (computed())
	// actions
	function showHelp() {
		isHelpVisible.value = true
	}
	function hideHelp() {
		isHelpVisible.value = false
	}

	return { isHelpVisible, showHelp, hideHelp }
})
