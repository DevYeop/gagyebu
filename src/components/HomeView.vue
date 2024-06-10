<template>
  <div class="container">
    <!-- <div class="flex-item item-1"><Bar :data="data" :options="options" /></div> -->
    <div class="flex-item item-2">
      <div v-for="rootItem in categoryList" class="flex-item item-2-1">
        <hr />
        {{ rootItem }}

        <div id="inner-container">
          <Item
            v-for="item in gagyeList"
            :key="item.id"
            :item="item"
            :category="rootItem"
          >
          </Item>
        </div>
        <span>수정 리스팅</span>
      </div>

      <hr />
      <Item v-for="item in gagyeList" :key="item.id" :item="item"> </Item>
    </div>
    <div class="flex-item item-3">
      <div class="input-group">
        <div class="form-group">
          <label for="last-name">날짜</label>
          <input
            type="date"
            id="last-name"
            aria-label="Last name"
            class="form-control"
            v-model="date"
          />
        </div>

        <div class="form-group">
          <label for="first-name">항목</label>
          <input
            type="text"
            id="first-name"
            aria-label="First name"
            class="form-control"
            v-model="title"
          />
        </div>

        <div class="form-group">
          <label for="last-name">가격</label>
          <input
            type="number"
            id="last-name"
            aria-label="Last name"
            class="form-control"
            v-model="price"
          />
        </div>

        <div class="form-group">
          <label for="selectCategory">분류</label>
          <select name="pets" id="selectCategory" v-model="selectedCategory">
            <option v-for="item in categoryList" :value="item">
              {{ item }}
            </option>
          </select>
        </div>

        <button type="submit" class="submit-button" @click="addItem">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import { ref, computed } from 'vue';
import { useGagyeListStore } from '@/stores/gagyeList';
import Item from '@/components/Item.vue';
import moment from 'moment';

const { addGagye, fetchGagyeList, fetchCategoryList } = useGagyeListStore();

const gagyeListStore = useGagyeListStore();

const title = ref('');
const price = ref('');
const date = ref('');
const selectedCategory = ref('');
const gagyeList = computed(() => gagyeListStore.gagyeList);
const categoryList = computed(() => gagyeListStore.categoryList);

const today = moment();
date.value = today.format('YYYY-MM-DD');
console.log("Today's date is: " + today.format('MM-DD'));

console.log('gagyeList', gagyeList);

const data = {
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 25] }],
};

const options = {
  responsive: true,
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const addItem = () => {
  if (
    title.value == '' ||
    price.value == '' ||
    date.value == '' ||
    selectedCategory.value == ''
  ) {
    console.log('장난?');
    return;
  }
  const data = {
    date: moment(date.value).format('YYYYMMDD'),
    title: title.value,
    price: price.value,
    category: selectedCategory.value,
  };
  addGagye(data);
  title.value = '';
  price.value = '';
};

fetchGagyeList();
fetchCategoryList();
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 컨테이너 높이 설정 */
}

.flex-item {
  /* 기본 스타일 지정 (선택사항) */
  padding: 10px;
}

.item-1 {
  flex-grow: 1;
  background-color: rebeccapurple;
}

.item-2 {
  flex-grow: 3;
  background-color: gray;
}

#inner-container {
  display: flex;
  flex-direction: column;
}

/* .item-2-1 {
  display: flex;
  flex-direction: row;
} */

.item-3 {
  flex-grow: 3;
  background-color: blue;
}

.input-group {
  display: flex;
  flex-direction: row;
  gap: 1rem; /* 각 입력 그룹 사이의 간격 조정 */
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem; /* 라벨과 인풋 간의 간격 조정 */
}
</style>
