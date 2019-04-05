<template>
	<v-flex :fill-height="fillHeight">
		<v-container ref="container" fluid elevation-0 grid-list-md text-xs-center :fill-height="fillHeight">
			<v-toolbar ref="toolbar" :dark="dark" :light="light" :color="color" absolute>
				<v-toolbar-title>{{ title }}</v-toolbar-title>
				<v-spacer></v-spacer>
				<slot name="toolbar-content"></slot>
			</v-toolbar>
			<slot></slot>
		</v-container>
	</v-flex>
</template>

<script lang="ts">
import { Vue, Watch, Component, Prop } from "vue-property-decorator";

@Component
export default class S2SForm extends Vue {
	@Prop() title!: string;
	@Prop() color!: string;
	@Prop() dark!: boolean;
	@Prop() light!: boolean;
	@Prop() fillHeight!: boolean;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
