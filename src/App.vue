<template>
	<v-app>
		<v-navigation-drawer class="secondary" dark fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
			<S2SNavigationMenus :config="drawerMenusExample"></S2SNavigationMenus>
		</v-navigation-drawer>
		<v-app-bar clipped-left app>
			<v-toolbar-title>Yes Please</v-toolbar-title>
			<v-spacer></v-spacer>
			<slot name="toolbar-content"></slot>
		</v-app-bar>
		<v-content>
			<S2SForm dark title="test Title" color="primary" fill-height>
				<S2SCard title="Card Title">
					<S2SFormGenerator
						:schema="formExample"
						:apiLookup="apiFetchMock"
						:data="{ flag: true, profile: { name: 'Name' }, parent: { child: { dob: '2019-05-21' }, flag: true } }"
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
import S2SNavigationMenus from "./components/S2SNavigationMenus.vue";
import S2SFormGenerator from "./components/formGenerator/S2SFormGenerator.vue";
import formExample from "../demo/form-example.json";
import drawerMenusExample from "../demo/drawer-menus-example";

export default {
	name: "App",
	components: {
		S2SCard,
		S2SForm,
		S2SFormGenerator,
		S2SFileUploader,
		S2SNavigationMenus
	},
	data() {
		return {
			result: 0,
			formExample: formExample,
			drawerMenusExample: drawerMenusExample
		};
	},
	methods: {
		async apiFetchMock(apiType) {
			if (apiType === "organisations") return ["test1", "test2", "test3"];
		}
	}
};
</script>
