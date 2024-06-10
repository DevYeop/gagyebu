<template>
  <li
    :class="
      false ? 'list-group-item list-group-item-success' : 'list-group-item'
    "
    id="container"
    v-if="item.category === category"
  >
    <span :class="false ? 'todo-done pointer' : 'pointer'">
      {{ item.date }}
      {{ item.title }}
    </span>

    <span :class="false ? 'todo-done pointer' : 'pointer'">
      {{ item.price }}
      {{ item.category }}
    </span>

    <!-- <span
      :class="
        isHoverDel
          ? 'float-end badge bg-danger pointer m-1'
          : 'float-end badge bg-secondary pointer m-1'
      "
      @click.stop="deleteTodo(todoItem.id)"
      @mouseover="isHoverDel = true"
      @mouseleave="isHoverDel = false"
    >
      삭제</span
    > -->
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

// import { useTodoListStore } from '@/stores/todoList.js';

// const todoListStore = useTodoListStore();

defineProps({
  item: { Type: Object, required: true },
  category: { Type: String, required: false },
});

// const router = useRouter();
// // const { deleteTodo, toggleDone } = inject('actions');
// const { deleteTodo, toggleDone } = todoListStore;

const isHoverDel = ref(false);
const isHoverEdit = ref(false);
</script>

<style scoped></style>
