<script lang="ts" setup>
import {useField, useForm} from 'vee-validate'
import {RegisterValidation} from "~/validation/register.validation";
import Button from "~/components/Button.vue";

const {handleSubmit} = useForm({
	validationSchema: RegisterValidation,
	validateOnMount: false,
})

const {value: email, errorMessage: emailError} = useField('email')
const {value: password, errorMessage: passwordError} = useField('password')

const error = ref("");
const submitting = ref(false);

const onSubmit = handleSubmit(async (values) => {
	if (submitting.value) return;

	submitting.value = true;

	try {
		const data = await $fetch("/api/auth/register", {
			method: "POST",
			body: {
				email: values.email,
				password: values.password,
			},
		});

		if (!data.success) {
			error.value = data.message || "An error occurred during registration.";
			console.error("❌ Registration failed:", data.message);
			return;
		}

		console.log("✅ Registration successful:", data);
		await navigateTo("/login");
	} catch (err: any) {
		console.error("❌ Request failed:", err);
		error.value = err.data?.message || "An unexpected error occurred.";
	} finally {
		submitting.value = false;
	}
});

</script>

<template>
	<NuxtLayout name="auth" reversed>
		<form class="flex flex-col gap-8 mb-4" @submit.prevent="onSubmit">
			<div class="flex flex-col gap-1">

				<p>Email Address</p>
				<Input
					v-model="email"
					placeholder="you@example.com"
					type="email"
				/>
				<p v-if="emailError" class="text-sm text-red-500">
					{{ emailError }}
				</p>
			</div>

			<div class="flex flex-col gap-1">
				<p>Password</p>
				<Input
					v-model="password"
					autocomplete="current-password"
					placeholder="*************"
					type="password"
				/>
				<p v-if="passwordError" class="text-sm text-red-500">
					{{ passwordError }}
				</p>
			</div>

			<p v-if="error" class="text-sm text-red-500">
				{{ error }}
			</p>

			<Button
				:isSubmitting="submitting"
				name="Sign Up"
			/>
		</form>
	</NuxtLayout>
</template>
