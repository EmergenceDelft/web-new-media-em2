<template>
  <a v-if="external" :href="link" class="link"> <slot /> </a>
  <NuxtLink v-else :to="link" class="link"><slot /> </NuxtLink>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    link: string
    external?: boolean
  }>(),
  {
    external: false
  }
)
</script>

<style scoped lang="scss">
.link {
  cursor: pointer;
}

.primary {
  background-color: $black;
  color: $white;
  text-decoration: underline;
  text-underline-offset: 4px;
}
</style>
