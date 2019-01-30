<template>
	<v-flex>
		<v-toolbar light>
			<v-toolbar-title>{{title}}</v-toolbar-title>
		</v-toolbar>
		<v-container fluid elevation-0 grid-list-md text-xs-center>
			<slot></slot>
		</v-container>
	</v-flex>
</template>

<script lang="ts">
import { Vue, Watch, Component, Prop } from "vue-property-decorator";

@Component
export default class S2SCard extends Vue {
	@Prop() title!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
