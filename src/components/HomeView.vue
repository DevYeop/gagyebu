<template>
  <div class="container">
    <!-- <div class="flex-item item-1"><Bar :data="data" :options="options" /></div> -->

    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-btn @click="() => getGagyeListByMonth(todayMonth - 1)">이전</v-btn>
        </v-col>

        <h1 style="margin: 10px; font-size: 40px">{{ todayMonth }}월</h1>

        <v-col cols="auto">
          <v-btn @click="() => getGagyeListByMonth(todayMonth + 1)">다음</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <div class="flex-item item-2">
      <div class="inner-container">
        <div v-for="rootItem in categoryList" class="flex-item item-2-1">
          <hr />
          {{ rootItem.value }}

          <div id="inner-container">
            <Item
              v-for="item in gagyeList"
              :key="item.id"
              :item="item"
              :category="rootItem.value"
            >
            </Item>
          </div>
        </div>
      </div>

      <hr />
      <Item v-for="item in gagyeList" :key="item.id" :item="item"> </Item>
    </div>

    <div class="flex-item item-3">
      <UserInput />
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
import { watchEffect, reactive, computed, watch } from 'vue';
import { useGagyeListStore } from '@/stores/gagyeList';
import UserInput from '@/components/UserInput.vue';
import Item from '@/components/Item.vue';
import moment from 'moment';

const {
  selectForEdit,
  fetchGagyeList,
  fetchCategoryList,
  getGagyeListByMonth,
} = useGagyeListStore();

const gagyeListStore = useGagyeListStore();

//

const gagyeList = computed(() => gagyeListStore.gagyeList);
const categoryList = computed(() => gagyeListStore.categoryList);
const foodTotal = computed(() => gagyeListStore.foodTotal);
const bookTotal = computed(() => gagyeListStore.bookTotal);
const todayMonth = computed(() => gagyeListStore.month);
const gagyeListLength = computed(() => gagyeListStore.gagyeListLength);
console.log('gagyeListLength', gagyeListLength.value);

// watch(gagyeList, () => {
//   console.log('gagyeList changed');
// });

// watch(todayMonth, () => {
//   console.log('isLoggedIn ref changed, do something!');
// });

let categoryListObj = gagyeListStore.categoryList;
let labelArray = categoryListObj.map((item) => item.value);

const data = reactive({
  labels: labelArray,
  datasets: [{ data: [foodTotal.value, bookTotal.value, 125, 1115] }],
});

// const data = {
//   labels: labelArray,
//   datasets: [{ data: [foodTotal.value, bookTotal.value, 25, 115] }],
// };

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

fetchGagyeList();
fetchCategoryList();
// getGagyeListByMonth();
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.flex-item {
  padding: 10px;
}

.item-1 {
  flex-grow: 1;
  background-color: gainsboro;
}

.item-2 {
  flex-grow: 3;
  background-color: gray;
}

#inner-container {
  display: flex;
  flex-direction: column;
}

.item-2-1 {
  flex-direction: row;
  width: 250px;
}

.inner-container {
  display: flex;
  flex-direction: row;
}

.item-3 {
  flex-grow: 3;
  background-color: black;
}
</style>
