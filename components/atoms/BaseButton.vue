<template>
  <div class="base-button">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.base-button {
  font-family: "Noto Sans Mono";
  margin-top: 0;
  font-weight: 400;
  width: fit-content;
  cursor: pointer;
}

.primary {
  background-color: $white;
  color: $black;
}

.primary:hover {
  background-color: #efefef;
}
</style>
