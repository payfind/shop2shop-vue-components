<template>
	<v-app>
		<v-toolbar ref app>
			<v-toolbar-title>Yes Please</v-toolbar-title>
			<v-spacer></v-spacer>
			<slot name="toolbar-content"></slot>
		</v-toolbar>
		<v-content>
			<S2SForm dark title="test Title" color="primary" fill-height>
				<S2SCard>
					<S2SFormGenerator
						:schema="formExample"
						:apiLookup="apiFetchMock"
						:data="{ profile: { name: 'Name' }, parent: { child: { dob: '2019-05-21' } } }"
					>
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
				<br />
				<S2SCard>
					<v-flex xs12>--- File Uploader ---</v-flex>
					<S2SFileUploader></S2SFileUploader>
				</S2SCard>
			</S2SForm>
		</v-content>
	</v-app>
</template>

<script>
import S2SForm from "./components/S2SForm.vue";
import S2SCard from "./components/S2SCard.vue";
import S2SFileUploader from "./components/S2SFileUploader.vue";
import S2SCurrencyInput from "./components/S2SCurrencyInput.vue";
import S2SFormGenerator from "./components/formGenerator/S2SFormGenerator.vue";
import formExample from "../demo/form-example.json";

export default {
	name: "App",
	components: {
		S2SCard,
		S2SForm,
		S2SFormGenerator,
		S2SFileUploader
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
