<template>
	<v-layout row wrap v-bind="layout.properties" v-if="valid">
		<v-flex xs12 md6 v-for="(field, index) in fields" :key="index" v-show="!field.hidden">
			<v-text-field v-if="field.component === 'v-text-field'" :label="field.label"></v-text-field>
			<v-select
				v-else-if="field.component === 'v-select' "
				:label="field.label"
				:items="(typeof field.items === 'string') ? getLookups(index, field.items) : []"
			></v-select>
			<v-checkbox v-else-if="field.component === 'v-checkbox'" :label="field.label"></v-checkbox>
			<v-autocomplete
				v-else-if="field.component === 'v-autocomplete'"
				:label="field.label"
				:items="(typeof field.items === 'string') ? getLookups(index, field.items) : []"
			></v-autocomplete>
		</v-flex>
	</v-layout>
</template>

<script lang="ts">
import { Vue, Watch, Component, Prop } from "vue-property-decorator";
import formGeneratorSchema from "@/components/formGenerator/formGeneratorSchema.json";
import productCreateForm from "@/components/formGenerator/product-create-form.json";
import safeCreateForm from "@/components/formGenerator/safe-create-form.json";

import { ComponentBase, Form, Layout } from "@/components/formGenerator/formGeneratedTypes.ts";
import Ajv from "ajv";

@Component
export default class S2SFormGenerator extends Vue {
	@Prop() title!: string;

	private fields: ComponentBase[] = [];
	private layout!: Layout;
	private valid = false;

	private lookups: any = {};

	private formGeneratorSchema = formGeneratorSchema;
	private productCreateForm: Form = safeCreateForm;
	private safeCreateForm: Form = safeCreateForm;

	mounted() {
		const ajv = new Ajv();
		const validate = ajv.compile(this.formGeneratorSchema);
		this.valid = validate(this.productCreateForm) as boolean;

		if (!this.valid) console.log(validate.errors);

		this.fields = this.productCreateForm.fields;
		this.layout = this.productCreateForm.layout;
	}

	getLookups(index: number, api: string | string[]) {
		var wait = (ms: any) => new Promise((r, j) => setTimeout(r, ms));
		wait(2000).then(() => {
			this.lookups[index] = ["test1", "test2", "test3", "test4"];
		});
		return this.lookups[index];
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
