<template>
  <div
    ref="module"
    class="module"
    :class="{ active: active }"
    @mousedown="onMouseDown"
    :style="{
      top: position.y + 'px',
      left: position.x + 'px',
      position: 'absolute'
    }"
  ></div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  defineProps,
  defineEmits,
  watch
} from "vue"

const props = defineProps({
  module: {
    type: Object,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(["toggle-module-active"])

const isDragging = ref(false)
const position = ref({ x: 0, y: 0 })
const offset = ref({ x: 0, y: 0 })
const startPosition = ref({ x: 0, y: 0 })

const onMouseDown = (event) => {
  isDragging.value = true
  const rect = event.target.getBoundingClientRect()
  offset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
  startPosition.value = {
    x: event.clientX,
    y: event.clientY
  }
}
const onMouseMove = (event) => {
  if (isDragging.value) {
    position.value = {
      x: event.clientX - offset.value.x,
      y: event.clientY - offset.value.y
    }
  }
}

const onMouseUp = () => {
  if (isDragging.value) {
    const endPosition = { x: position.value.x, y: position.value.y }
    const deltaX = endPosition.x - startPosition.value.x + 25
    const deltaY = endPosition.y - startPosition.value.y + 25
    if (Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20) {
      selectModule()
    }
    isDragging.value = false
    updateModulePosition(endPosition)
  }
}

const selectModule = () => {
  emit("toggle-module-active", props.module)
}

const setInitialPosition = () => {
  const container = document.getElementById("module-canvas")
  const rect = container.getBoundingClientRect()
  position.value = {
    x: rect.width * props.module.position_x,
    y: rect.height * props.module.position_y
  }
}

const convertRealToRelativePosition = (position) => {
  const container = document.getElementById("module-canvas")
  const rect = container.getBoundingClientRect()
  return {
    x: position.x / rect.width,
    y: position.y / rect.height
  }
}

const updateModulePosition = async (position) => {
  const relativePosition = convertRealToRelativePosition(position)
  const { data, error } = await useApi(`/modules/${props.module.id} `, {
    default: () => [],
    method: "PUT",
    body: {
      orientation: props.module.orientation,
      position_x: relativePosition.x,
      position_y: relativePosition.y
    }
  })
  if (error.value) {
    console.error("Failed to fetch modules:", error.value)
  }
}

onMounted(() => {
  setInitialPosition()
  window.addEventListener("mousemove", onMouseMove)
  window.addEventListener("mouseup", onMouseUp)
})

onUnmounted(() => {
  window.removeEventListener("mousemove", onMouseMove)
  window.removeEventListener("mouseup", onMouseUp)
})

watch(() => props.module, setInitialPosition)
</script>

<style lang="scss" scoped>
@keyframes pulse {
  0%,
  100% {
    box-shadow:
      0 0 10px 3px rgba(173, 216, 230, 0.6),
      0 0 15px 10px rgba(173, 216, 230, 0.5);
  }
  50% {
    box-shadow:
      0 0 15px 5px rgba(173, 216, 230, 0.8),
      0 0 20px 15px rgba(173, 216, 230, 0.7);
  }
}

@keyframes pulse-active {
  0%,
  100% {
    box-shadow:
      0 0 10px 3px rgba(255, 255, 255, 0.6),
      0 0 15px 10px rgba(255, 255, 255, 0.5);
  }
  50% {
    box-shadow:
      0 0 15px 5px rgba(255, 255, 255, 0.8),
      0 0 20px 15px rgba(255, 255, 255, 0.7);
  }
}

.module {
  border-radius: 100%;
  width: 50px;
  height: 50px;
  background-image: url("./images/module_core.png");
  background-size: cover;
  animation: pulse 10s infinite;
  position: relative; /* Ensure the module is absolutely positioned */
  cursor: pointer; /* Change cursor to pointer */
}

.module.active {
  background-color: white; /* Change background color to white when active */
  animation: pulse-active 10s infinite; /* Use pulse-active animation when active */
}
</style>
