<template>
<v-container class="fill-height d-flex align-center justify-center">
  <div class="text-center">
    <div>
      <v-img
        class="mb-4 rounded-circle"
        size="150"
        src="@/assets/imgs/avatar.jpg"
      />
    </div>
    <h1 class="">Welcome to MFJip's Blog</h1>
    <p class="text-h6 mb-4">Technology Stack:</p>
    <v-card class="mx-auto" max-width="300">
      <v-list :items="items" />
    </v-card>
  </div>

</v-container>
</template>
<script setup></script>
