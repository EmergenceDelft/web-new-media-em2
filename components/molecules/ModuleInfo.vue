<template>
  <div class="module-info">
    <div class="module-info-text">
      <BaseText>id: {{ module.id }}</BaseText>
      <BaseText>sensors: {{ module.sensors }}</BaseText>
      <BaseText>orientation: {{ module.orientation }}</BaseText>
      <BaseText>amount of voxels: {{ module.amountOfVoxels }}</BaseText>
    </div>
    <div class="module-info-buttons">
      <BaseLink :link="moduleLink" class="plr-0-5 primary">Edit</BaseLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"

const props = defineProps<{
  module: any //TODO: change type
}>()

const moduleLink = computed(() => {
  return "/module/" + props.module.id + "/edit"
})
</script>

<style scoped lang="scss">
.module-info {
  padding-top: 20px;
  border-bottom: 1px solid $white;
  display: flex;
  flex-direction: row;
}
</style>
