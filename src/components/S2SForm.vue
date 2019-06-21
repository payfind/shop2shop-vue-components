<template>
	<v-sheet elevation-0 class="background" height="100%">
		<v-toolbar>
			<v-toolbar-title>{{ title }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<slot name="toolbar-content"></slot>
		</v-toolbar>
		<v-container>
			<slot></slot>
		</v-container>
	</v-sheet>
	<!-- <v-flex :fill-height="fillHeight">
		<v-toolbar v-if="!fillHeight" :dark="dark" :light="light" :color="color">
			<v-toolbar-title>{{ title }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<slot name="toolbar-content"></slot>
		</v-toolbar>
		<v-container ref="container" fluid elevation-0 grid-list-md text-xs-center :fill-height="fillHeight" :d-block="fillHeight">
			<slot></slot>
		</v-container>
	</v-flex>-->
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
