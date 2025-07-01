<template>
  <v-footer class="text-center d-flex" app height="50">
    <div class="d-flex ga-3">
      <v-btn
        v-for="[icon, link] in links"
        :key="index"
        :icon="icon"
        class="social-link"
        :href="link"
      ></v-btn>
    </div>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px"
    >
      &copy; 2021-{{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block">MFJip</span>
      — All rights reserved.
    </div>
  </v-footer>
</template>

<script setup>
const links = [
  ["mdi-twitter", "https://x.com/Sgss740417"],
  ["mdi-github", "https://github.com/Sgss123"],
];
</script>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
