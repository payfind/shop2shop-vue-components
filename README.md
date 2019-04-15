# Vue Numeric Input

[![npm](https://img.shields.io/npm/v/shop2shop-vue-components.svg?style=flat-square)](https://www.npmjs.com/package/vue-numeric-input)
[![npm](https://img.shields.io/npm/dt/shop2shop-vue-components.svg?style=flat-square)](https://www.npmjs.com/package/vue-numeric-input)
[![Build Status](https://travis-ci.org/JayeshLab/shop2shop-vue-components.svg?branch=master)](https://travis-ci.org/JayeshLab/vue-numeric-input)
[![codecov](https://codecov.io/gh/JayeshLab/shop2shop-vue-components/branch/master/graph/badge.svg)](https://codecov.io/gh/JayeshLab/vue-numeric-input)
[![npm](https://img.shields.io/npm/l/shop2shop-vue-components.svg?style=flat-square)](http://opensource.org/licenses/MIT)

A component library containting custom components build for vuetify.js. To be able to use this library you need vuetify.js in your project.

### Installation

Install via NPM

`$ npm install vue-numeric-input --save`

#### Global

Register library globally:

```javascript
import Vue from "Vue";
import shop2shop from "shop2shop-vue-components";

Vue.use(shop2shop);
```

### Usage

#### Basic usage

```html
<template>
	<div>
		<S2SForm title="Form Title">
			<S2SCard>
				Any other components could livehere
			</S2SCard>
		</S2SForm>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				value: 1
			};
		}
	};
</script>
```
