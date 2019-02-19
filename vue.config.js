module.exports = {
	chainWebpack: config => {
		config.resolve.set("symlinks", false);
	},
	configureWebpack: config => {
		if (process.env.NODE_ENV === "production") {
			return {
				externals: {
					ajv: {
						commonjs: "ajv",
						commonjs2: "ajv"
					},
					"vue-class-component": {
						commonjs: "vue-class-component",
						commonjs2: "vue-class-component"
					},
					"vue-property-decorator": {
						commonjs: "vue-property-decorator",
						commonjs2: "vue-property-decorator"
					},
					vuetify: {
						commonjs: "vuetify",
						commonjs2: "vuetify",
						root: "Vuetify"
					}
				}
			};
		}
	}
};
