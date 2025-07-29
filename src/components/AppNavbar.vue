<template>
  <div class="nav">
    <nav>
      <v-app-bar app dark>
        <v-avatar class="border-sm" image="@/assets/imgs/avatar.jpg" />
        <v-toolbar-title>MFJip</v-toolbar-title>
        <v-spacer />
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/qsl">QSL签发系统</v-btn>
        <v-btn text to="/contact">Contact</v-btn>
      </v-app-bar>
    </nav>
  </div>
</template>

<style scoped>
.nav {
  font-family: mcae, sans-serif;
}
</style>