<script lang="ts" setup>
defineProps({
	name: {
		type: String,
		default: "Sign Up"
	},
	isSubmitting: {
		type: Boolean,
		default: false
	},

})
</script>

<template>
	<button
		class="py-2.5 w-full rounded-full font-bold bg-accent hover:bg-accent/80 transition-all text-gold-dark flex flex-row gap-2 items-center justify-center cursor-pointer"
		type="submit"
	>
		<div v-if="!isSubmitting" class="flex flex-row gap-2 items-center">
			{{ name }}
			<i-arrow-right class="text-xl pt-1"/>
		</div>

		<div v-else>
			Submitting...
		</div>
	</button>
</template>