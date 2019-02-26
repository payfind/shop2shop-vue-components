type ComponentName = "v-text-field" | "v-select" | "v-checkbox" | "v-autocomplete" | "v-label";
export type ComponentType = VTextField | VSelect | VCheckbox | VAutocomplete | VLabel;

export interface Layout {
	properties: {
		"d-block"?: boolean;
	};
}

export interface ComponentProperties {
	"item-value"?: string;
	"item-text"?: string;
}

export interface ComponentBase {
	// Base members
	label: string;
	name: string;
	component: ComponentName;
	hidden?: boolean;
	properties?: ComponentProperties;
	validation?: string;
	containerProperties?: any;
}

interface VTextField extends ComponentBase {
	component: "v-text-field";
}

interface VSelect extends ComponentBase {
	component: "v-select";
	items: string | string[];
}

interface VAutocomplete extends ComponentBase {
	component: "v-autocomplete";
	items: string | string[];
}

interface VCheckbox extends ComponentBase {
	component: "v-checkbox";
}

interface VLabel extends ComponentBase {
	component: "v-label";
}

export interface Form {
	layout: Layout;
	fields: ComponentType[];
}
