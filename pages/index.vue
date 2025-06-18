<script lang="ts" setup>
import {nextTick, ref, watch} from 'vue';

const fakeData = [
	{
		id: 1,
		createdAt: new Date().toISOString(),
		title: "Night Shift at the Hospital",
		content: `Just got back from the most surreal night shift at the hospital. A full moon always brings out the interesting cases, but last night was something else. Had a patient come in convinced they'd been bitten by a werewolf - turned out to be their neighbor's very large, very normal German Shepherd. Can't blame them though; at 3 AM, everything feels a bit supernatural. Dr. Chen and I couldn't stop laughing about it during our coffee break.`,
	},
	{
		id: 2,
		createdAt: new Date("2024-10-15").toISOString(),
		title: "Pottery Classes and Urban Foraging",
		content: `Finally took that leap and signed up for pottery classes! The studio has this amazing earthy smell - clay dust and coffee from the café next door. My first attempt at making a bowl looked more like a wonky ashtray, but my instructor Sarah said that's totally normal. There's something so therapeutic about feeling the clay move between your fingers, even when it's not quite doing what you want it to.`,
	},
	{
		id: 3,
		createdAt: new Date("2024-09-20").toISOString(),
		title: null,
		content: `Spent the weekend hiking up in the mountains. The air was crisp, and the leaves were just starting to turn. We stumbled upon this hidden waterfall that looked like something out of a fairy tale. Spent hours just sitting there, listening to the water and soaking in the beauty of it all. Can't wait to go back next month when the colors are even more vibrant.`,
	},
	{
		id: 4,
		createdAt: new Date("2024-08-05").toISOString(),
		title: "Beach Day with Friends",
		content: `Had the best beach day with friends! The sun was shining, and the waves were perfect for surfing. We built the most epic sandcastle, complete with a moat and everything. Ended the day with a bonfire, roasting marshmallows and sharing stories under the stars. Days like these remind me how important it is to take a break and just enjoy life.`,
	},
	{
		id: 5,
		createdAt: new Date("2024-07-15").toISOString(),
		title: null,
		content: `Spent the day exploring the city with my camera. Found this amazing street art mural that just blew me away. Met some local artists who were super passionate about their work. Ended the day at a rooftop bar, watching the sunset over the skyline. It's days like these that make me fall in love with my city all over again.`,
	},
]
const currentDate = new Date()

const getCategorizedNotes = () => {
	return {
		Today: fakeData.filter(note => {
			const noteDate = new Date(note.createdAt)
			const diff = Math.floor((currentDate.getTime() - noteDate.getTime()) / (1000 * 60 * 60 * 24))
			return diff === 0
		}),
		Yesterday: fakeData.filter(note => {
			const noteDate = new Date(note.createdAt)
			const diff = Math.floor((currentDate.getTime() - noteDate.getTime()) / (1000 * 60 * 60 * 24))
			return diff === 1
		}),
		'Last 7 Days': fakeData.filter(note => {
			const noteDate = new Date(note.createdAt)
			const diff = Math.floor((currentDate.getTime() - noteDate.getTime()) / (1000 * 60 * 60 * 24))
			return diff > 1 && diff <= 7
		}),
		'Last 30 Days': fakeData.filter(note => {
			const noteDate = new Date(note.createdAt)
			const diff = Math.floor((currentDate.getTime() - noteDate.getTime()) / (1000 * 60 * 60 * 24))
			return diff > 7 && diff <= 30
		}),
		Older: fakeData.filter(note => {
			const noteDate = new Date(note.createdAt)
			const diff = Math.floor((currentDate.getTime() - noteDate.getTime()) / (1000 * 60 * 60 * 24))
			return diff > 30
		}),
	}
}

const categorizedNotes = getCategorizedNotes()

const selectedItem = ref(1);

const editedContent = ref<string>('')
watch(() => selectedItem.value, () => {
	const foundNote = Object.values(categorizedNotes)
		.flat()
		.find(note => note.id === selectedItem.value)
	editedContent.value = foundNote?.content || ''
})

const saveNote = () => {
	const note = fakeData.find(n => n.id === selectedItem.value)
	if (note) {
		note.content = editedContent.value
	}
}
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const autoResize = () => {
	if (textareaRef.value) {
		textareaRef.value.style.height = 'auto' // reset height
		const newHeight = Math.min(textareaRef.value.scrollHeight, window.innerHeight * 0.6) // max 60% of viewport height
		textareaRef.value.style.height = newHeight + 'px'
	}
}

watch(editedContent, () => {
	nextTick(() => autoResize())
})
</script>

<template>
	<div class="bg-black-deep text-white min-h-screen w-screen flex overflow-hidden">
		<!-- Left Sidebar -->
		<div class="w-80 h-screen p-8 overflow-y-auto flex-shrink-0">
			<div class="flex flex-row items-center gap-2 mb-12">
				<i-logo class="text-3xl" fill-opacity="0"/>
				<h2 class="text-xl font-medium">Flex<span class="font-bold text-accent">Note</span></h2>
			</div>

			<div v-for="(notes, categoryName) in categorizedNotes" :key="categoryName" class="mb-8">
				<div v-if="notes.length > 0">
					<ul class="text-sm font-bold text-gray mb-2">{{ categoryName }}</ul>
					<ul class="space-y-3">
						<li v-for="note in notes" :key="note.id"
							:class="['p-3  text-white rounded-lg cursor-pointer hover:bg-gold-muted/50 transition-all duration-300', selectedItem === note.id && 'bg-gold-muted']"
							@click="selectedItem = note.id">
							<p class="font-bold whitespace-nowrap inline-block overflow-hidden text-ellipsis w-full">
								{{ note.title || note.content }}
							</p>
							<div class="flex flex-row gap-1 text-sm justify-between">
								<p>
									{{
										new Date(note.createdAt).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'short',
											day: 'numeric'
										})
									}}
								</p>
								<p class="text-white-soft">
									{{ note.content.length }} characters
								</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Right Content Area -->
		<div class="h-screen bg-black flex-1 flex flex-col overflow-hidden">
			<!-- Header -->
			<div class="p-8 w-full flex justify-between flex-shrink-0">
				<div class="flex flex-row items-center gap-2 font-bold text-gray cursor-pointer">
					<i-create class="text-2xl text-icon mt-0.5"/>
					Create Note
				</div>
				<div class="cursor-pointer text-icon hover:text-accent transition-all duration-300">
					<i-delete class="text-2xl cursor-pointer mt-0.5"/>
				</div>
			</div>

			<!-- Content Area with Scroll -->
			<div class="flex-1 px-8 h-full">
				<div class="flex flex-col items-center w-full playfair h-full">
					<div class="w-3/4 max-w-2xl h-full py-8">
						<p class="text-gray-medium mb-2 playfair text-xl">
							{{
								new Date(categorizedNotes['Today'].find(note => note.id === selectedItem)?.createdAt || new Date()).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								})
							}}
						</p>
						<h2

							:class="{'text-gray-medium': !categorizedNotes['Today'].find(note => note.id === selectedItem)}"
							class="text-3xl font-bold mb-4 playfair text-white"

						>
							{{
								categorizedNotes['Today'].find(note => note.id === selectedItem)?.title || 'Untitled Note'
							}}
						</h2>
						<textarea
							ref="textareaRef"
							v-model="editedContent"
							class="w-full bg-black-soft text-white rounded-lg focus:outline-none focus:ring-0 playfair text-lg min-h-full pb-5"
							placeholder="Start writing your note..."
							rows="1"
							style="resize: none; overflow-y: auto;"
							@input="autoResize"
						/>
					</div>
				</div>
				<div class="fixed bottom-8 right-8">
					<button
						class="bg-black-deep text-white px-4 py-2 rounded-full shadow-md cursor-pointer hover:bg-black-deep/40 transition-all duration-300"
						@click="saveNote">
						Save Note
					</button>
				</div>
			</div>
		</div>
	</div>
</template>