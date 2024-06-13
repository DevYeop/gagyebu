import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import moment from 'moment';
import { Alert } from 'bootstrap';

/**
 * 모드에 따라서
 * 정렬되는 기준을 다르게 하는 걸 구현
 */

export const useGagyeListStore = defineStore('todoList', () => {
  const BASE_URI = '/api/gagye';
  // state를 직접 return 하는건 비권장

  const today = moment();
  const monthState = parseInt(today.format('MM'));

  const state = reactive({
    gagyeList: [],
    categoryList: [],
    month: monthState,
    id: '',
    title: '',
    price: '',
    date: moment().format('YYYY-MM-DD'),
    category: 'food',
    mode: 'input',
  });

  const sortByDate = (data) => {
    const sortedData = data.sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });
    return sortedData;
  };

  const fetchGagyeList = async () => {
    try {
      const response = await axios.get(BASE_URI);
      if (response.statusText === 'OK') {
        state.gagyeList = sortByDate(response.data);
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  const getGagyeListByMonth = async (month) => {
    if (month < 1 || month > 12) {
      alert('어딜');

      return;
    }
    try {
      const response = await axios.get(BASE_URI);
      if (response.statusText === 'OK') {
        const gagyeListFull = response.data;
        const filtered = gagyeListFull.filter(
          (item) => moment(item.date).format('MM') == month
        );
        state.gagyeList = filtered;
        state.month = parseInt(month);
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  const fetchCategoryList = async () => {
    const BASE_URI = '/api/category';
    try {
      const response = await axios.get(BASE_URI);

      if (response.statusText === 'OK') {
        state.categoryList = response.data;
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  const addGagye = async ({ date, title, price, category }) => {
    try {
      const payload = { date, title, price, category };
      const response = await axios.post(BASE_URI, payload);
      if (response.statusText === 'Created') {
        state.gagyeList.push({ ...response.data, done: false });
        state.month = parseInt(moment(date).format('M'));
      } else {
        alert('Todo 추가 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  const editGagye = async ({ date, title, price, category }) => {
    try {
      const payload = { date, title, price, category };
      console.log('payload:', payload);
      const response = await axios.put(BASE_URI + `/${state.id}`, payload);
      console.log('response', response);
      if (response.statusText === 'OK') {
        fetchGagyeList();
        cancelEdit();
      } else {
        alert('Todo 추가 실패');
      }
    } catch (error) {
      if (error.code === 'ERR_BAD_REQUEST') {
        alert('지우고 수정완료하면 어카니 :(');
      }
      // alert('에러발생 :' + error);
    }
  };

  const selectForEdit = (item) => {
    state.id = item.id;
    state.date = moment(item.date).format('YYYY-MM-DD');
    state.title = item.title;
    state.price = item.price;
    state.category = item.category;
    state.mode = 'edit';
  };

  const cancelEdit = () => {
    state.mode = 'input';
  };

  // 기존 TodoItem을 변경합니다.
  const updateTodo = async ({ id, todo, desc, done }, successCallback) => {
    // const updateTodo = async ({ data }, successCallback) => {
    // 를 실제로 자주 쓰면서, 이걸 썻을 때 할 수 잇는 점
    try {
      const payload = { id, todo, desc, done };
      const response = await axios.put(BASE_URI + `/${id}`, payload);
      if (response.status === 200) {
        let index = state.gagyeList.findIndex((todo) => todo.id === id);
        state.gagyeList[index] = payload;
        successCallback();
      } else {
        alert('Todo 변경 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(BASE_URI + `/${id}`); // patch를 한다면?
      if (response.statusText === 'OK') {
        fetchGagyeList();
      } else {
        alert('Todo 완료 변경 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  const gagyeList = computed(() => state.gagyeList);
  const gagyeListLength = computed(() => state.gagyeList.length);
  const categoryList = computed(() => state.categoryList);
  const isLoading = computed(() => state.isLoading);

  const foodTotal = computed(() => {
    const filtered = state.gagyeList.filter((item) => item.category == 'food');
    let total = 0;
    filtered.map((x) => (total += parseInt(x.price)));
    return total;
  });

  const bookTotal = computed(() => {
    const filtered = state.gagyeList.filter((item) => item.category == 'book');
    let total = 0;
    filtered.map((x) => (total += x.price));
    return total;
  });

  const month = computed(() => state.month);
  const mode = computed(() => state.mode);

  const inputTitle = computed({
    get: () => state.title,
    set: (newValue) => {
      state.title = newValue;
    },
  });
  const inputPrice = computed({
    get: () => state.price,
    set: (newValue) => {
      state.price = newValue;
    },
  });
  const inputDate = computed({
    get: () => state.date,
    set: (newValue) => {
      state.date = newValue;
    },
  });
  const inputCategory = computed({
    get: () => state.category,
    set: (newValue) => {
      state.category = newValue;
    },
  });

  return {
    inputTitle,
    inputPrice,
    inputDate,
    inputCategory,
    gagyeList,
    categoryList,
    foodTotal,
    bookTotal,
    month,
    isLoading,
    mode,
    fetchGagyeList,
    fetchCategoryList,
    addGagye,
    updateTodo,
    deleteItem,
    getGagyeListByMonth,
    selectForEdit,
    cancelEdit,
    editGagye,
    gagyeListLength,
  };
});
