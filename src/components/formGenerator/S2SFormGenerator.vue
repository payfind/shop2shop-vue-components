<template>
	<v-layout row wrap v-bind="layout.properties" v-if="valid">
		<v-flex xs12 md6 v-for="(field, index) in formFields" :key="index" v-show="!field.hidden" v-bind="field.containerProperties">
			<v-text-field
				v-if="field.component === 'v-text-field'"
				:label="field.label"
				v-model="model[field.name]"
				v-bind="field.properties"
				v-validate="field.validation"
				:data-vv-name="field.name"
				:error-messages="errors.collect(field.name)"
			></v-text-field>
			<v-select
				v-else-if="field.component === 'v-select'"
				:label="field.label"
				:items="lookups[field.name]"
				v-model="model[field.name]"
				v-bind="field.properties"
				v-validate="field.validation"
				:data-vv-name="field.name"
				:error-messages="errors.collect(field.name)"
			></v-select>
			<v-checkbox v-else-if="field.component === 'v-checkbox'" v-model="model[field.name]" :label="field.label"></v-checkbox>
			<v-autocomplete
				v-else-if="field.component === 'v-autocomplete'"
				:label="field.label"
				v-bind="field.properties"
				v-model="model[field.name]"
				:search-input.sync="search[field.name]"
				:items="lookups[field.name]"
				v-validate="field.validation"
				:data-vv-name="field.name"
				:error-messages="errors.collect(field.name)"
			></v-autocomplete>
			<v-menu
				v-else-if="field.component === 'v-date-picker'"
				v-model="menu[field.name]"
				:close-on-content-click="false"
				:nudge-right="40"
				lazy
				transition="scale-transition"
				offset-y
				full-width
				min-width="290px"
			>
				<v-text-field slot="activator" v-model="model[field.name]" :label="field.label" prepend-icon="event" readonly></v-text-field>
				<v-date-picker v-model="model[field.name]" no-title scrollable></v-date-picker>
			</v-menu>
			<label v-else-if="field.component === 'v-label'">{{ field.label }}</label>
			<slot v-else-if="field.component === 'v-slot'" :name="field.slotName" :model="model"></slot>
		</v-flex>
	</v-layout>
</template>

<script lang="ts">
import { Vue, Watch, Component, Prop } from "vue-property-decorator";
import formGeneratorSchema from "@/components/formGenerator/formGeneratorSchema.json";

import { ComponentBase, ComponentType, Form, Layout } from "@/components/formGenerator/formGeneratedTypes.ts";
import Ajv from "ajv";

import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

@Component({
	$_veeValidate: {
		validator: "new"
	}
})
export default class S2SFormGenerator extends Vue {
	@Prop() title!: string;
	@Prop() apiLookup!: (url: string) => Promise<any>;
	@Prop() schema!: any;
	@Prop() data!: any;

	private formFields: ReadonlyArray<ComponentType> = [];
	private layout!: Layout;
	private valid = false;

	private model: any = {};
	private menu: any = {};
	private date: any = {};
	public search = {}; // For the components with the search attribute

	private lookups: any = [];

	private formGeneratorSchema = formGeneratorSchema;
	private schemaForm!: Form;

	mounted() {
		const ajv = new Ajv();
		const validate = ajv.compile(this.formGeneratorSchema);

		this.valid = validate(this.schema) as boolean;

		if (!this.valid && validate.errors) throw Error(JSON.stringify(validate.errors));
		// We need some proper error notification here

		this.schemaForm = this.schema;
		this.formFields = Object.freeze(this.schemaForm.fields);
		this.layout = this.schemaForm.layout;
		this.fetchLookups();
		this.buildDefaultValues();

		this.valid = true;

		this.$validator.localize("en", this.buildValidationDictionary());
	}

	@Watch("data", { immediate: true })
	private onData() {
		if (!this.data) return;
		this.model = this.data;
	}

	private async fetchLookups() {
		for (let field of this.formFields) {
			if (field.component !== "v-slot" && (field.component === "v-select" || field.component === "v-autocomplete")) {
				if (typeof field.items === "string") {
					const response = await this.apiLookup(field.items);
					if (!response.data) {
						Vue.set(this.lookups, field.name, response);
					} else {
						const data = response.data.results ? response.data.results : response.data;
						Vue.set(this.lookups, field.name, data);
					}
				} else {
					Vue.set(this.lookups, field.name, field.items);
				}
			}
		}
	}

	private buildDefaultValues() {
		for (let field of this.formFields) {
			if (field.component === "v-checkbox" && !this.model[field.name]) this.model[field.name] = false;
		}
	}

	public validate() {
		return this.$validator.validateAll();
	}

	private getLookups(index: number, api: string | string[]) {
		let response!: any;
		if (typeof api === "string" && this.apiLookup) {
			this.apiLookup(api).then(response => {
				const data = response.data.results ? response.data.results : response.data;
				this.lookups[index] = data;
			});
			this.lookups[index] = [];

			return this.lookups[index];
		} else {
			return api;
		}
	}

	private buildValidationDictionary() {
		const attributes: { [name: string]: string } = {};
		for (let i = 0; i < this.formFields.length; i++) {
			const component = this.formFields[i];
			if (component.component === "v-slot") continue; // For the time being we wont build validation dictionary for slot component

			attributes[component.name] = component.label;
		}
		const dictionary = {
			attributes
		};
		return dictionary;
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
