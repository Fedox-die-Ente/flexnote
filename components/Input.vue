<script lang="ts" setup>
defineProps<{
	placeholder?: string
	type?: string
	modelValue: unknown
}>()

const emit = defineEmits(['update:modelValue'])

const onInput = (e: Event) => {
	emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
	<input
		:placeholder="placeholder"
		:type="type"
		:value="modelValue as string"
		class="bg-input-bg border border-border-base pl-4 w-full py-2 rounded-md focus:outline-none focus:ring-0 text-white placeholder:text-text-muted"
		@input="onInput"
	/>
</template>

<style scoped>

</style>