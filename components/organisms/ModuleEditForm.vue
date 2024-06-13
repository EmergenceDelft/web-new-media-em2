<template>
  <div class="module-edit-form">
    <BaseTitle class="white-text"> Edit module </BaseTitle>
    <BaseInput label="Id" :disabled="true" :value="module.id"></BaseInput>
    <BaseInput label="Sensors" :value="module.sensors"></BaseInput>
    <BaseInput label="Orientation" :value="module.orientation"></BaseInput>
    <BaseInput
      label="Amount of Voxels"
      :value="module.amountOfVoxels"
    ></BaseInput>
    <BaseButton />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"

const props = defineProps<{
  module: any
}>()
</script>

<style scoped lang="scss">
.module-edit-form {
  max-width: 400px;
  margin: auto;
  margin-top: 40px;
}
</style>
