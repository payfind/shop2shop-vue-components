import Vue from "vue";
import S2SCard from "@/components/S2SCard.vue";
import S2SForm from "@/components/S2SForm.vue";
import S2SCurrencyInput from "@/components/S2SCurrencyInput.vue";
import S2SFormGenerator from "@/components/formGenerator/S2SFormGenerator.vue";

const Components = {
	S2SForm,
	S2SCard,
	S2SCurrencyInput,
	S2SFormGenerator
};

Object.keys(Components).forEach(name => {
	Vue.component(name, (Components as any)[name]);
});

export default Components;
