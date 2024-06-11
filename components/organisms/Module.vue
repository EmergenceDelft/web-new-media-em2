<template>
  <div
    class="module"
    :class="{ active: active }"
    @mousedown="onMouseDown"
    :style="{
      top: position.y - 25 + 'px',
      left: position.x - 25 + 'px',
      position: 'absolute'
    }"
  ></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from "vue"

const props = defineProps({
  stats: {
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
    x: event.clientX - rect.left - rect.width / 2,
    y: event.clientY - rect.top - rect.height / 2
  }
  startPosition.value = {
    x: event.clientX,
    y: event.clientY
  }
  position.value = {
    x: event.clientX - offset.value.x,
    y: event.clientY - offset.value.y
  }
}

const onMouseUp = () => {
  if (isDragging.value) {
    const endPosition = { x: position.value.x, y: position.value.y }
    const deltaX = endPosition.x - startPosition.value.x
    const deltaY = endPosition.y - startPosition.value.y
    console.log(deltaX, deltaY)
    // Change this to make sure its only the mouse being in the right position, not the movement
    if (Math.abs(deltaX) < 25 && Math.abs(deltaY) < 25) {
      console.log("Normal click")
      // handle normal click
      selectModule()
    } else {
      console.log("Drag ended")
      // handle drag end
    }
    isDragging.value = false
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

const selectModule = () => {
  emit("toggle-module-active", props.stats)
}

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove)
  window.addEventListener("mouseup", onMouseUp)
})

onUnmounted(() => {
  window.removeEventListener("mousemove", onMouseMove)
  window.removeEventListener("mouseup", onMouseUp)
})
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
  position: absolute; /* Ensure the module is absolutely positioned */
  cursor: pointer; /* Change cursor to pointer */
}

.module.active {
  background-color: $white; /* Change background color to white when active */
  animation: pulse-active 10s infinite; /* Use pulse-active animation when active */
}
</style>
