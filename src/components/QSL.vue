<template>
  <v-container
    class="fill-height bg-surface-variant flex-column d-flex justify-center align-center"
    fluid
  >
    <span class="text-h3">QSL签发系统</span>
    <v-card class="w-50" fluid>
      <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
        <v-tab value="1">签发</v-tab>
        <v-tab value="2">签收</v-tab>
        <v-tab value="3">代发</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="1">
          <v-container class="w-100 d-flex justify-center align-center">
            <v-sheet class="w-100">
              <v-form class="d-flex flex-column justify-center align-center">
                <span class="text-h5">签发</span>
                <v-spacer />
                <v-text-field
                  class="w-50"
                  clearable
                  label="呼号"
                />
              </v-form>
            </v-sheet>
          </v-container>
        </v-tabs-window-item>
        <v-tabs-window-item value="2">
          <v-container class="w-100 d-flex justify-center align-center">
            <v-sheet class="w-100">
              <v-form class="d-flex flex-column justify-center align-center">
                <span class="text-h5">签收</span>
                <v-spacer />
                <v-text-field
                  class="w-50"
                  clearable
                  label="呼号"
                />
              </v-form>
            </v-sheet>
          </v-container>
        </v-tabs-window-item>
        <v-tabs-window-item value="3">
          <v-container class="w-100 d-flex justify-center align-center">
            <v-sheet class="w-100">
              <v-form class="d-flex flex-column justify-center align-center">
                <span class="text-h5">代发</span>
                <v-spacer />
                <v-text-field
                  class="w-50"
                  clearable
                  label="呼号"
                />
              </v-form>
            </v-sheet>
          </v-container>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-container>
</template>
<script setup>
  import { ref } from 'vue'

  const tab = ref(null)
</script>
