type ComponentName = "v-text-field" | "v-select" | "v-checkbox";
type ComponentType = VTextField | VSelect | VCheckbox;

export interface ComponentBase {
	// Base members
	label: string;
	component: ComponentName;
	hidden: boolean;
}

interface VTextField extends ComponentBase {
	component: "v-text-field";
}

interface VSelect extends ComponentBase {
	component: "v-select";
	items: string | string[];
}

interface VCheckbox extends ComponentBase {
	component: "v-checkbox";
}

export interface Form {
	fields: ComponentType[];
}
