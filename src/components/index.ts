import Vue from "vue";
import S2SCard from "@/components/S2SCard.vue";

const Components = {
  S2SCard
};

Object.keys(Components).forEach(name => {
  Vue.component(name, (<any>Components)[name]);
});

export default Components;
