<template>
	<v-card>
		<v-toolbar light dense v-if="title">
			<v-toolbar-title>{{title}}</v-toolbar-title>
		</v-toolbar>
		<v-sheet tile>
			<v-card-text>
				<div class="text-xs-center">
					<slot></slot>
				</div>
			</v-card-text>
		</v-sheet>
	</v-card>
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
