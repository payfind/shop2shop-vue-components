<template>
	<v-app>
		<v-content>
			<S2SCurrencyInput v-model="result"></S2SCurrencyInput>
			<S2SForm title="test Title">
				<S2SCard>
					result: {{result}}
					<!-- <S2SFormGenerator ></S2SFormGenerator> -->
				</S2SCard>
			</S2SForm>
		</v-content>
	</v-app>
</template>

<script>
import S2SForm from "./components/S2SForm.vue";
import S2SCard from "./components/S2SCard.vue";
import S2SCurrencyInput from "./components/S2SCurrencyInput.vue";
import S2SFormGenerator from "./components/formGenerator/S2SFormGenerator.vue";

export default {
	name: "App",
	components: {
		S2SCard,
		S2SForm,
		S2SCurrencyInput
		// S2SFormGenerator
	},
	data() {
		return {
			result: 0
		};
	}
};
</script>
