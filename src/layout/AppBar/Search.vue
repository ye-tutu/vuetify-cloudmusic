<template>
  <v-sheet width='230' color='transparent'>
    <v-text-field
      solo
      dense
      rounded
      hide-details
      placeholder='search'
      :background-color='$vuetify.theme.isDark ? "" : "grey lighten-2"'
      :flat='!isFocus'
      @focus='isFocus = true'
      @blur='isFocus = false'
      v-model='value'
      @keyup.13='search'
      clearable
    ></v-text-field>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    isFocus: false,
    value: ''
  }),
  methods: {
    search() {
      if (this.value !== '') {
        this.$router
          .push({
            path: '/search',
            query: {
              keywords: this.value
            }
          })
          .then(() => {
            this.value = ''
          })
      }
    }
  }
}
</script>
