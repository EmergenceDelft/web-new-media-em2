<template>
  <div class="base-input">
    <label for="">{{ label }}</label>
    <input
      :value="value"
      :type="type"
      :min="min"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :name="name"
      v-bind="$attrs"
      :class="{ disabled }"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: string | number | null
  label?: string
  min?: string | number
  placeholder?: string
  type?: string
  disabled?: boolean
  maxlength?: number
  name?: string
}>()
</script>

<style lang="scss" scoped>
.base-input {
  width: 100%;
}

.base-input input {
  height: 27px;
  border: 0;
  border-bottom: 1px solid $white;
  font-family: "Manrope";
  font-size: 1.5rem;
  line-height: 22px;
  width: 100%;
  background-color: $black;
  color: $white;
  margin-top: 0.5rem;
}

.base-input label {
  width: 100%;
  font-family: "Manrope";
  font-size: 1.5rem;
  line-height: 20px;
  letter-spacing: 1px;
  color: $white;
  margin-top: 1rem;
  display: block;
}

.disabled {
  border: none;
}
</style>
