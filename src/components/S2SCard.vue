<template>
	<v-card>
		<v-toolbar light v-if="title">
			<v-toolbar-title>{{ title }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<slot name="toolbar-content"></slot>
		</v-toolbar>
		<v-sheet tile>
			<v-card-text v-if="hasSlot('default')">
				<slot></slot>
			</v-card-text>

			<!-- Removes padding for content. Typical usecase is using datagrid inside this component -->
			<slot name="fluid"></slot>
		</v-sheet>
	</v-card>
</template>

<script lang="ts">
import { Vue, Watch, Component, Prop } from "vue-property-decorator";
@Component
export default class S2SCard extends Vue {
	@Prop() title!: string;

	hasSlot(name: string) {
		return !!this.$slots[name] || !!this.$scopedSlots[name];
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
