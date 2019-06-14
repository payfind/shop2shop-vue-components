<template>
	<v-layout row wrap>
		<v-flex xs12 class="text-sm-left">
			<v-btn color="primary" class="ml-0" @click="onImageUpload">{{ uploadButtonText }}</v-btn>
			<div v-for="file of selectedFiles" :key="file.name">{{ file.name }}</div>
		</v-flex>
		<input ref="file" type="file" v-on:change="onFileSelected" style="display: none" />
	</v-layout>
</template>

<script lang="ts">
import { Vue, Watch, Component, Prop } from "vue-property-decorator";

@Component
export default class S2SFileUpload extends Vue {
	@Prop({ default: "Upload" }) uploadButtonText!: string;
	@Prop(Boolean) multiple!: boolean;
	@Prop() api!: (file: File) => Promise<{ data: any }>;
	@Prop() itemValue!: string;

	public selectedFiles: File[] = [];

	private onImageUpload(e: any) {
		(<any>this.$refs["file"]).click();
	}

	private async onFileSelected(e: any) {
		// const response = await this.api(e.target.files[0]);
		const response: any = { data: { id: "xxx" } };
		debugger;
		this.$emit("change", response.data[this.itemValue] || response.data);

		if (!this.multiple) {
			this.selectedFiles = [];
			this.selectedFiles.push(e.target.files[0]);
		} else {
			for (let file of e.target.files) {
				this.selectedFiles.push(file);
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
