<template>
  <div v-show="mode === 'input'" :class="{ rotate: isRotating }">
    <v-form v-model="valid">
      <v-container
        style="border: 10; border-color: aliceblue; border-width: 2px"
      >
        <v-row>
          <v-col cols="12" md="2">
            <div class="form-group">
              <label for="last-name">날짜 </label>
              <input
                type="date"
                id="last-name"
                aria-label="Last name"
                class="form-control"
                v-model="inputDate"
              />
            </div>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="inputTitle"
              :counter="10"
              :rules="nameRules"
              label="항목"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              type="number"
              v-model="inputPrice"
              :counter="10"
              :rules="nameRules"
              label="가격"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="1">
            <div class="form-group">
              <label for="selectCategory">분류</label>
              <select name="pets" id="selectCategory" v-model="inputCategory">
                <option
                  v-for="item in categoryList"
                  :key="item.key"
                  :value="item.value"
                >
                  {{ item.value }}
                </option>
              </select>
            </div>
          </v-col>

          <v-col cols="12" md="1">
            <v-btn prepend-icon="$vuetify" stacked @click="addItem">
              저장
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>

  <div
    class="input-group-edit"
    v-show="mode === 'edit'"
    :class="{ rotate: isRotating }"
  >
    <div class="form-group">
      <label for="last-name">날짜 </label>
      <input
        type="date"
        id="last-name"
        aria-label="Last name"
        class="form-control"
        v-model="inputDate"
      />
    </div>

    <div class="form-group">
      <label for="selectCategory">분류</label>
      <select name="pets" id="selectCategory" v-model="inputCategory">
        <option
          v-for="item in categoryList"
          :key="item.key"
          :value="item.value"
        >
          {{ item.value }}
        </option>
      </select>
    </div>

    <button type="submit" class="submit-button" @click="editItem">Edit</button>
    <button type="submit" class="submit-button" @click="cancelEdit">
      cancel
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import moment from 'moment';
import { useGagyeListStore } from '@/stores/gagyeList';
import { storeToRefs } from 'pinia';

watchEffect(() => {
  console.log('object');
});

const isRotating = ref(false);

const { addGagye, cancelEdit, editGagye } = useGagyeListStore();
const gagyeListStore = useGagyeListStore();

// 컴퓨티드로하고 액션을 받아서 oncahnge에 할당
// const inputTitle = ref('');

const { inputTitle, inputPrice, inputDate, inputCategory } =
  storeToRefs(gagyeListStore);

const categoryList = computed(() => gagyeListStore.categoryList);
const mode = computed(() => gagyeListStore.mode);

const addItem = () => {
  isRotating.value = true;
  setTimeout(() => {
    isRotating.value = false;
  }, 600); // 애니메이션 시간과 일치시킴

  if (
    inputTitle.value == '' ||
    inputPrice.value == '' ||
    inputDate.value == '' ||
    inputCategory.value == ''
  ) {
    alert('제대로해라');
    return;
  }

  const data = {
    date: moment(inputDate.value).format('YYYYMMDD'),
    title: inputTitle.value,
    price: inputPrice.value,
    category: inputCategory.value,
  };
  addGagye(data);
  inputTitle.value = '';
  inputPrice.value = '';
};

const editItem = () => {
  isRotating.value = true;
  setTimeout(() => {
    isRotating.value = false;
  }, 800); // 애니메이션 시간과 일치시킴

  if (
    inputTitle.value == '' ||
    inputPrice.value == '' ||
    inputDate.value == '' ||
    inputCategory.value == ''
  ) {
    console.log('ㄴㄴ');
    return;
  }

  const data = {
    date: moment(inputDate.value).format('YYYYMMDD'),
    title: inputTitle.value,
    price: inputPrice.value,
    category: inputCategory.value,
  };
  editGagye(data);
  inputTitle.value = '';
  inputPrice.value = '';
};
</script>
<style scoped>
.input-group {
  display: flex;
  flex-direction: row;
  gap: 1rem; /* 각 입력 그룹 사이의 간격 조정 */
  background-color: aqua;
}

.input-group-edit {
  display: flex;
  flex-direction: row;
  gap: 1rem; /* 각 입력 그룹 사이의 간격 조정 */
  background-color: red;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem; /* 라벨과 인풋 간의 간격 조정 */
}

.rotate {
  transition: transform 0.6s;
  transform: rotateX(360deg);
}

.form-group {
  color: aliceblue;
}
</style>
