type ComponentName = "v-text-field" | "v-select" | "v-checkbox" | "v-autocomplete";
type ComponentType = VTextField | VSelect | VCheckbox | VAutocomplete;

export interface Layout {
	properties: {
		"d-block": boolean;
	};
}

export interface ComponentBase {
	// Base members
	label: string;
	name: string;
	component: ComponentName;
	hidden?: boolean;
	required?: boolean;
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
