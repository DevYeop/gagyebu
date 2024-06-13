<template>
  <li
    v-if="
      item.category === category &&
      moment(item.date).format('M') == currentMonth
    "
    @click.stop="selectForEdit(item)"
    @mouseover="isHoverDel = true"
    @mouseout="isHoverDel = false"
  >
    <span :class="false ? 'todo-done pointer' : 'pointer'">
      {{ moment(item.date).format('MM/DD') }}
      {{ item.title }}
    </span>

    <span :class="false ? 'todo-done pointer' : 'pointer'">
      {{ item.price }}
    </span>

    <span @click.stop="deleteItem(item.id)" v-show="isHoverDel"> 삭제</span>
  </li>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import moment from 'moment';
import { useGagyeListStore } from '@/stores/gagyeList';

const { deleteItem, selectForEdit } = useGagyeListStore();

const isRotating = ref(false);
const isHoverDel = ref(false);

const gagyeListStore = useGagyeListStore();
const currentMonth = computed(() => gagyeListStore.month);

defineProps({
  item: { type: Object, required: true },
  category: { type: String, required: false },
});

// 컴포넌트가 마운트될 때 회전 애니메이션 효과 주기
onMounted(() => {
  isRotating.value = true;
  setTimeout(() => {
    isRotating.value = false;
  }, 600); // 애니메이션 시간과 일치시킴
});
</script>

<style scoped>
.rotate {
  transition: transform 0.6s;
  transform: rotateX(360deg);
}

#container {
  background-color: blue;
}
</style>
