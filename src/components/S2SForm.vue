<template>
	<v-sheet elevation-0 class="background" height="100%">
		<v-toolbar :color="color">
			<v-toolbar-title>{{ title }}</v-toolbar-title>
			<slot name="breadcrumbs"></slot>
			<v-spacer></v-spacer>
			<slot name="toolbar-content"></slot>
		</v-toolbar>
		<slot name="no-padding"></slot>
		<v-container fluid>
			<slot></slot>
		</v-container>
	</v-sheet>
</template>

<script lang="ts">
import { Vue, Watch, Component, Prop } from "vue-property-decorator";

@Component
export default class S2SForm extends Vue {
	@Prop() title!: string;
	@Prop() color!: string;
	@Prop(Boolean) dark!: boolean;
	@Prop(Boolean) light!: boolean;
	/** Currently you can have a toolbar with a form with filled height*/
	@Prop(Boolean) fillHeight!: boolean;

	items = [
		{
			text: "Dashboard",
			disabled: false,
			href: "breadcrumbs_dashboard"
		},
		{
			text: "Link 1",
			disabled: false,
			href: "breadcrumbs_link_1"
		},
		{
			text: "Link 2",
			disabled: true,
			href: "breadcrumbs_link_2"
		}
	];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
