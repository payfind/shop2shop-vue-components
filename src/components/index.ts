import { VueConstructor } from "vue";
import S2SCard from "@/components/S2SCard.vue";
import S2SForm from "@/components/S2SForm.vue";
import S2SCurrencyInput from "@/components/S2SCurrencyInput.vue";
import S2SFormGenerator from "@/components/formGenerator/S2SFormGenerator.vue";

export default function install(Vue: VueConstructor) {
	Vue.component("S2SCard", S2SCard);
	Vue.component("S2SForm", S2SForm);
	Vue.component("S2SCurrencyInput", S2SCurrencyInput);
	Vue.component("S2SFormGenerator", S2SFormGenerator);
}

export { S2SForm, S2SCard, S2SCurrencyInput, S2SFormGenerator };