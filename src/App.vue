<template>
	<v-app>
		<v-content>
			<S2SForm title="test Title">
				<S2SCard>
					<S2SFormGenerator :schema="formExample" :apiLookup="apiFetchMock">
						<template v-slot:test="{ model }">
							<v-flex xs12>
								<v-select
									:items="[{ name: 'wood', id: 1 }, { name: 'steel', id: 2 }, { name: 'glass', id: 3 }]"
									v-model="model.test"
									item-value="id"
									item-text="name"
									multiple
									label="Materials"
								></v-select>
							</v-flex>
						</template>
					</S2SFormGenerator>
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
import formExample from "../demo/form-example.json";

export default {
	name: "App",
	components: {
		S2SCard,
		S2SForm,
		S2SFormGenerator
	},
	data() {
		return {
			result: 0,
			formExample: formExample
		};
	},
	methods: {
		async apiFetchMock(apiType) {
			if (apiType === "organisations") return ["test1", "test2", "test3"];
		}
	}
};
</script>
