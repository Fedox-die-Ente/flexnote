<script lang="ts" setup>
defineProps<{
	reversed?: boolean;
	error?: string;
}>();

const register = `
December 3rd, 2024

Just got back from the most surreal night shift at the hospital. A full moon always brings out the
interesting cases, but last night was something else. Had a patient come in convinced they'd been
bitten by
a werewolf - turned out to be their neighbor's very large, very normal German Shepherd. Can't blame
them
though; at 3 AM, everything feels a bit supernatural. Dr. Chen and I couldn't stop laughing about it
during our coffee break.

The sunrise from the hospital rooftop made the whole crazy night worth it. There's this magical
moment just
before the city wakes up, when everything is bathed in soft purple light. Watched a flock of birds
sweep
across the sky while finishing my last cup of coffee. Even after five years, these quiet moments
still
remind me why I chose this path. Though next time, I'm definitely bringing my thermal socks -
December
mornings are no joke!
`

const login = `
October 15th, 2024

Finally took that leap and signed up for pottery classes! The studio has this amazing earthy smell - clay
dust and coffee from the café next door. My first attempt at making a bowl looked more like a wonky ashtray,
but my instructor Sarah said that's totally normal. There's something so therapeutic about feeling the clay
move between your fingers, even when it's not quite doing what you want it to.

On my way home, I stopped by that new bookstore on Oak Street. Found this incredible book on urban foraging
of all things! Who knew there were edible plants growing all over the city? Already planning to try
identifying some this weekend at the park. Think I'll bring Maya along - she's always up for my random
adventures, even if they end with us eating weeds. At least we'll have a good story to tell at Sunday brunch.
`
</script>

<template>
	<body :class="['text-white', reversed ? 'bg-black-deep' : 'bg-black']">
	<div class="flex h-screen">
		<!-- Sidebar - Left Part -->
		<div :class="['h-full flex-shrink-0 w-full lg:w-1/3', reversed ? 'bg-black' : 'bg-black-deep']">
			<!-- Inner container -->
			<div class="flex justify-center h-full px-18 flex-col gap-4">
				<div class="flex flex-row items-center gap-2 mb-4">
					<i-logo class="text-3xl" fill-opacity="0"/>
					<h2 class="text-xl font-medium">Flex<span class="font-bold text-accent">Note</span></h2>
				</div>

				<div class="mb-4">
					<h2 class="text-xl font-bold">
						{{ reversed ? 'Sign up for a free account' : 'Log in to your account' }}
					</h2>
					<p class="font-regular text-md">
						{{ reversed ? 'Already have an account?' : 'Don\'t have an account yet?' }}
						<a :href="reversed ? '/login' : '/register'"

						   class="text-accent hover:text-accent/80 transition-all font-bold underline"

						>
							{{ reversed ? 'Log in' : 'Sign up' }}
						</a>
					</p>
				</div>

				<slot/>

				<div class="flex flex-row gap-2">
					<a class="text-gray cursor-pointer" href="/imprint">
						Imprint
					</a>
					<a class="text-gray cursor-pointer" href="/privacy">
						Privacy Policy
					</a>
				</div>
			</div>

		</div>

		<!-- Content Area - Right Part -->
		<div class="w-full items-center justify-center h-full flex-1 hidden lg:flex">
			<!-- Text Container -->
			<div
				class="w-full justify-center flex flex-col px-4 overflow-x-auto overflow-y-hidden break-all">
				<p class="note-content text-lg break-words text-left mx-auto px-4 whitespace-pre-wrap">
					{{ reversed ? register : login }}
				</p>
			</div>
		</div>


	</div>
	</body>
</template>
