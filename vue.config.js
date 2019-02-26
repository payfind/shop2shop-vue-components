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
					"vee-validate": {
						commonjs: "vee-validate",
						commonjs2: "vee-validate"
					},
					"vue-class-component": {
						commonjs: "vue-class-component",
						commonjs2: "vue-class-component"
					},
					"vue-property-decorator": {
						commonjs: "vue-property-decorator",
						commonjs2: "vue-property-decorator"
					},
					"vuetify/lib": {
						commonjs: "vuetify/lib",
						commonjs2: "vuetify/lib",
						root: "Vuetify"
					}
				}
			};
		}
	}
};
