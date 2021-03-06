type ComponentName = "v-file-uploader" | "v-text-field" | "v-textarea" | "v-select" | "v-checkbox" | "v-autocomplete" | "v-label" | "v-date-picker" | "v-slot";
export type ComponentType = VFileUploader | VTextField | VTextArea | VSelect | VCheckbox | VAutocomplete | VLabel | VDataPicker | VSLot;

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
	breakpoints?: {};
	defaultVal?: any;
}

interface VTextField extends ComponentBase {
	component: "v-text-field";
}

interface VTextArea extends ComponentBase {
	component: "v-textarea";
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

interface VDataPicker extends ComponentBase {
	component: "v-date-picker";
}

interface VSLot {
	component: "v-slot";
	slotName: string;
	defaultVal: any;
}

interface VFileUploader extends ComponentBase {
	component: "v-file-uploader";
}

export interface Form {
	layout: Layout;
	fields: ComponentType[];
}
