<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'limited'
}

const props = defineProps<Props>()

const rarityColor = computed(() => {
  switch (props.rarity) {
    case 'common':
      return 'bg-gray-100 text-gray-600 border-gray-200'
    case 'uncommon':
      return 'bg-green-50 text-green-600 border-green-200'
    case 'rare':
      return 'bg-blue-50 text-blue-600 border-blue-200'
    case 'epic':
      return 'bg-purple-50 text-purple-600 border-purple-200'
    case 'limited':
      return 'bg-amber-50 text-amber-600 border-amber-200'
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200'
  }
})
</script>

<template>
  <span
    class="text-[10px] px-2 py-1 rounded-full font-medium border"
    :class="rarityColor"
  >
    {{ rarity.toUpperCase() }}
  </span>
</template>
