<template>
  <div class="index">
    <div class="main-area">
      <div class="inner-main-area" id="module-canvas">
        <Module
          v-for="mod in modules"
          :key="mod.id"
          :module="mod"
          :active="activeModules.includes(mod)"
          @toggle-module-active="toggleModuleActive"
        />
      </div>
      <div class="main-area-footer">
        <BaseButton class="index-button primary p-1-0 fs-1-25">
          Entangle
        </BaseButton>
      </div>
    </div>
    <TheSidePanel :modules="activeModules" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useApi } from "@/composables/useApi"

const modules = ref([])
const activeModules = ref([])
const showingPanel = ref(true)

const toggleModuleActive = (mod: any) => {
  if (activeModules.value.includes(mod)) {
    activeModules.value.splice(activeModules.value.indexOf(mod), 1)
  } else {
    activeModules.value.push(mod)
  }
}

// Fetch modules on component mount
onMounted(async () => {
  const { data, error } = await useApi("/modules", {
    default: () => []
  })
  if (!error.value) {
    modules.value = data.value
  } else {
    console.error("Failed to fetch modules:", error.value)
  }
})
</script>

<style scoped lang="scss">
.index {
  display: flex;
  justify-content: space-between;
  position: absolute;
  height: 100%;
  width: 100%;
}
.inner-main-area {
  width: 100%;
  height: 100%;
  position: relative;
}
.main-area {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.main-area-footer {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
