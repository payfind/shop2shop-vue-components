<template>
	<v-list nav :dense="dense" shaped>
		<v-list-item-group v-model="selectedItem">
			<template v-for="(item, index) in config">
				<v-list-group
					v-if="item.children"
					:key="item.text"
					:prepend-icon="item.icon"
					:hidden="item.hidden"
					active-class="accent--text secondary lighten-1"
					no-action
				>
					<!-- Nav Item Title -->
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title v-text="item.text"></v-list-item-title>
						</v-list-item-content>
					</template>
					<!-- Nav Item Children-->
					<v-list-item
						v-for="(child, i) in item.children"
						:key="i"
						@click="$router.push(child.href)"
						:hidden="child.hidden"
						active-class="accent--text secondary lighten-1"
					>
						<v-list-item-content>
							<v-list-item-title>{{ child.text }}</v-list-item-title>
						</v-list-item-content>
						<v-list-item-action v-if="child.icon">
							<v-icon>{{ child.icon }}</v-icon>
						</v-list-item-action>
					</v-list-item>
				</v-list-group>

				<v-list-item
					v-else
					:hidden="item.hidden"
					:key="index"
					v-model="selectedItem[index]"
					active-class="accent--text"
					@click="$router.push(item.href)"
				>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ item.text }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</template>
		</v-list-item-group>
	</v-list>
</template>

<script lang="ts">
import menuConfig from "../static/config/nav-menu-config.json";

import { Vue, Watch, Component, Prop } from "vue-property-decorator";

@Component
export default class S2SNavigationMenus extends Vue {
	@Prop() config!: any;
	@Prop() dense!: boolean;

	private selectedItem: any = {};
}
</script>
