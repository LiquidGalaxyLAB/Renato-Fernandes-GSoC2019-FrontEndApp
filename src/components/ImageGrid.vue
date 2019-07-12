<template>
  <v-card>
    <v-card-actions>
      <h2>Image</h2>
      <v-spacer></v-spacer>
    </v-card-actions>
    <v-container v-bind="{ [`grid-list-sm`]: true }" fluid>
      <v-layout row wrap>
        <vue-select-image :dataImages="imagelist" @onselectimage="onSelectImage"></vue-select-image>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import VueSelectImage from "vue-select-image";
require("vue-select-image/dist/vue-select-image.css");
export default {
  data: () => ({
    size: "sm",
    items: [
      { text: "Extra small (2px)", value: "xs" },
      { text: "Small (4px)", value: "sm" },
      { text: "Medium (8px)", value: "md" },
      { text: "Large (16px)", value: "lg" },
      { text: "Extra large (24px)", value: "xl" }
    ],
    imagelist: null,
    selected: null
  }),

  methods: {
    images: function(r) {
      let images = [];
      r.keys().map((item, index) => {
        images.push({
          id: index + 1,
          src: r(item),
          alt: "Sensor img"
        });
      });
      return images;
    },
    onSelectImage: function(v) {
      this.selected=v.id
      this.$store.dispatch("setImg", this.selected)
      
    }
  },
  mounted() {
    this.imagelist = this.images(
      require.context("../assets/sensorimg", false, /\.(png|jpe?g|svg)$/)
    );
  }
};
</script>
