<template>
	<v-list>
		<template v-for="item in config">
			<v-list-group
				v-if="item.children"
				v-model="item.model"
				:key="item.text"
				:prepend-icon="item.icon"
				:hidden="item.hidden"
				active-class="accent--text"
				no-action
			>
				<!-- Nav Item Title -->
				<v-list-tile slot="activator">
					<v-list-tile-content>
						<v-list-tile-title>{{ item.text }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<!-- Nav Item Children-->
				<v-list-tile
					v-for="(child, i) in item.children"
					:key="i"
					@click="$router.push(child.href)"
					:hidden="child.hidden"
					style="background-color: var(--v-primary-base)"
				>
					<v-list-tile-content>
						<v-list-tile-title>{{ child.text }}</v-list-tile-title>
					</v-list-tile-content>
					<v-list-tile-action v-if="child.icon">
						<v-icon>{{ child.icon }}</v-icon>
					</v-list-tile-action>
				</v-list-tile>
			</v-list-group>
			<div v-else :hidden="item.hidden" :key="item.id">
				<v-list-tile @click="$router.push(item.href)" :key="item.text" class="flat-nav-item">
					<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{ item.text }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
>>> .v-list__group__header .v-list__tile {
	padding-left: 0px !important;
}

>>> .v-list__tile__action {
	min-width: 40px;
}
</style>
