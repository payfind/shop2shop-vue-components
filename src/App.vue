<template>
  <v-app>
    <v-content>
      <S2SForm title="test Title">
        <S2SCard>
          <v-flex xs6>
            <v-text-field name="name" label="label" id="id"></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field name="name" label="label" id="id"></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field name="name" label="label" id="id"></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field name="name" label="label" id="id"></v-text-field>
          </v-flex>
        </S2SCard>
      </S2SForm>
    </v-content>
  </v-app>
</template>

<script>
import S2SForm from "./components/S2SForm.vue";
import S2SCard from "./components/S2SCard.vue";

export default {
  name: "App",
  components: {
    S2SCard,
    S2SForm
  },
  data() {
    return {
      //
    };
  }
};
</script>
