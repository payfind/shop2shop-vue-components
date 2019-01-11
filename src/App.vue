<template>
  <v-app>
    <v-content>
      <S2SCard title="test Title"></S2SCard>
    </v-content>
  </v-app>
</template>

<script>
import S2SCard from "./components/S2SCard.vue";

export default {
  name: "App",
  components: {
    S2SCard
  },
  data() {
    return {
      //
    };
  }
};
</script>
