<template>
  <div class="module-edit">
    <ModuleEditForm :module="module"></ModuleEditForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const module = ref({
  id: 1,
  sensors: 4,
  orientation: "north",
  amountOfVoxels: 10,
  positionX: 500,
  positionY: 200
})
</script>
