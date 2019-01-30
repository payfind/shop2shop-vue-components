<template>
	<v-text-field
		name="amount"
		v-model="displayValue"
		:label="label"
		@blur="isInputActive = false"
		@focus="isInputActive = true"
		@input="updateValue()"
	></v-text-field>
</template>

<script lang="ts">
import { Vue, Watch, Component, Prop } from "vue-property-decorator";

@Component
export default class S2SCurrencyInput extends Vue {
	@Prop({ default: "R" })
	symbol!: string;
	@Prop({ default: " " })
	thousandsSeperator!: string;
	@Prop({ default: "" })
	label!: string;
	@Prop({ default: 0 })
	value!: number;

	private isInputActive = false;
	private _displayValue = "";

	updateValue() {
		this.$emit("input", this.value);
	}

	get displayValue() {
		if (this.isInputActive) {
			// Cursor is inside the input field. unformat display value for user
			return this.value.toString();
		} else {
			// User is not modifying now. Format display value for user interface
			return `${this.symbol} ` + (+this.value).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, `$1${this.thousandsSeperator}`);
		}
	}

	set displayValue(modifiedValue: string) {
		// Recalculate value after ignoring "R" and "," in user input
		let newValue = parseFloat(modifiedValue.replace(/[^\d.]/g, ""));
		// Ensure that it is not NaN
		if (isNaN(newValue)) {
			newValue = 0;
		}
		// Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
		// $emit the event so that parent component gets it
		this.value = newValue;
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
