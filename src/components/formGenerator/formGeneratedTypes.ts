type ComponentName = "v-text-field" | "v-select" | "v-checkbox" | "v-autocomplete";
export type ComponentType = VTextField | VSelect | VCheckbox | VAutocomplete;

export interface Layout {
	properties: {
		"d-block": boolean;
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

export interface Form {
	layout: Layout;
	fields: ComponentType[];
}
