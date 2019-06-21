<template>
	<v-card>
		<v-toolbar ref="toolbar" dense v-if="title || hasSlot('toolbar-content')" color="#EEEEEE" flat>
			<v-toolbar-title>{{ title }}</v-toolbar-title>
			<v-spacer v-if="title"></v-spacer>
			<slot name="toolbar-content"></slot>
		</v-toolbar>
		<v-container grid-list-xs>
			<slot></slot>
		</v-container>
	</v-card>
</template>

<script lang="ts">
import { Vue, Watch, Component, Prop } from "vue-property-decorator";
@Component
export default class S2SCard extends Vue {
	@Prop() title!: string;
	@Prop({ default: 0 }) elevation!: number | string;

	hasSlot(name: string) {
		return !!this.$slots[name] || !!this.$scopedSlots[name];
	}

	get computeElevation() {
		return `elevation-${this.elevation}`;
	}

	mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
