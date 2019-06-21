<template>
	<v-layout row wrap v-bind="layout.properties" v-if="valid">
		<v-flex xs12 md6 v-for="(field, index) in formFields" :key="index" v-show="!field.hidden" v-bind="field.containerProperties" px-2>
			<v-text-field
				v-if="field.component === 'v-text-field'"
				:label="field.label"
				v-bind="field.properties"
				v-validate="field.validation"
				:data-vv-name="field.name"
				:error-messages="errors.collect(field.name)"
				:value="getValue(field.name)"
				@input="onInput($event, field.name)"
			></v-text-field>
			<v-select
				v-else-if="field.component === 'v-select'"
				:label="field.label"
				:items="lookups[field.name]"
				:value="getValue(field.name)"
				@input="onInput($event, field.name)"
				v-bind="field.properties"
				v-validate="field.validation"
				:data-vv-name="field.name"
				:error-messages="errors.collect(field.name)"
			></v-select>
			<v-checkbox
				v-else-if="field.component === 'v-checkbox'"
				:input-value="getValue(field.name)"
				@change="onInput($event, field.name)"
				:label="field.label"
			></v-checkbox>
			<v-autocomplete
				v-else-if="field.component === 'v-autocomplete'"
				:label="field.label"
				v-bind="field.properties"
				:value="getValue(field.name)"
				@input="onInput($event, field.name)"
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
				<v-text-field slot="activator" :value="getValue(field.name)" :label="field.label" prepend-icon="event" readonly></v-text-field>
				<v-date-picker :value="getValue(field.name)" @input="onInput($event, field.name)" no-title scrollable></v-date-picker>
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

	private onInput(value: any, fieldName: string) {
		this.setValue(fieldName, value);
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

	private isObject(item: any) {
		return item && typeof item === "object" && !Array.isArray(item);
	}

	/**
	 * Deep merge two objects.
	 * @param target
	 * @param ...sources
	 */
	private mergeDeep(target: any, ...sources: any): any {
		if (!sources.length) return target;
		const source = sources.shift();

		if (this.isObject(target) && this.isObject(source)) {
			for (const key in source) {
				if (this.isObject(source[key])) {
					if (!target[key]) Object.assign(target, { [key]: {} });
					this.mergeDeep(target[key], source[key]);
				} else {
					Object.assign(target, { [key]: source[key] });
				}
			}
		}

		return this.mergeDeep(target, ...sources);
	}

	private buildObjectFromString(keyString: string, defaultVal: any) {
		let str = keyString,
			arr = str.split("."),
			obj,
			o: any = (obj = {});

		for (let i = 0; i < arr.length; i++) {
			if (arr.length === i + 1) o = o[arr[i]] = defaultVal;
			else o = o[arr[i]] = {};
		}

		this.model = this.mergeDeep(this.model, obj);
	}

	private buildDefaultValues() {
		for (let field of this.formFields) {
			// We always want checkboxes to be defaulted to false!
			if (field.component === "v-checkbox" && !this.getValue(field.name)) this.buildObjectFromString(field.name, false);
			else if (field.component !== "v-slot" && !this.getValue(field.name)) this.buildObjectFromString(field.name, field.defaultVal);
			else if (field.component === "v-slot" && !this.getValue(field.slotName)) this.buildObjectFromString(field.slotName, field.defaultVal || {});
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

	/**
	 * Get any value in an object spesified by the string. It supports nested object which can be spesified by dot notation
	 */
	private getValue(fieldName: string) {
		return fieldName.split(".").reduce((obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined), this.model);
	}

	/**
	 * This will set a value, building a nested object according to the path parameter
	 * @param path This will build a nestes object according to the dot notation string
	 * @param value The will that will be assign to the key, either if it's nested or flat
	 */
	private setValue(path: string, value: any) {
		var schema = this.model; // a moving reference to internal objects within obj
		var pList = path.split(".");
		var len = pList.length;
		for (var i = 0; i < len - 1; i++) {
			var elem = pList[i];
			if (!schema[elem]) schema[elem] = {};
			schema = schema[elem];
		}
		schema[pList[len - 1]] = value;
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
