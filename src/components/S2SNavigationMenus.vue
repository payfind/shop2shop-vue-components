<template>
	<v-list nav :dense="dense" shaped>
		<template v-for="item in config">
			<v-list-group
				v-if="item.children"
				v-model="item.model"
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
				<v-list-item v-for="(child, i) in item.children" :key="i" @click="$router.push(child.href)" :hidden="child.hidden">
					<v-list-item-content>
						<v-list-item-title>{{ child.text }}</v-list-item-title>
					</v-list-item-content>
					<v-list-item-action v-if="child.icon">
						<v-icon>{{ child.icon }}</v-icon>
					</v-list-item-action>
				</v-list-item>
			</v-list-group>
			<div v-else :hidden="item.hidden" :key="item.id">
				<v-list-item @click="$router.push(item.href)" :key="item.text">
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ item.text }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</div>
		</template>
	</v-list>
</template>

<script lang="ts">
import menuConfig from "../static/config/nav-menu-config.json";

import { Vue, Watch, Component, Prop } from "vue-property-decorator";

@Component
export default class S2SNavigationMenus extends Vue {
	@Prop() config!: any;
	@Prop() dense!: boolean;
}
</script>
