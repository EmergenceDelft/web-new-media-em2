<template>
  <div class="side-panel">
    <div class="side-panel-title">
      <BaseTitle2 class="white-text"> Selected Modules </BaseTitle2>
    </div>
    <div class="side-panel-content">
      <ModuleInfo v-for="mod in modules" :module="mod" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue"

const props = defineProps({
  modules: {
    type: [Object],
    required: true
  }
})
</script>

<style scoped lang="scss">
.side-panel {
  width: 350px;
  height: 100%;
  color: #fff;
  padding: 20px;
  border-left: 1px solid $white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}
.side-panel-title {
  border-bottom: 1px solid $white;
}
</style>
