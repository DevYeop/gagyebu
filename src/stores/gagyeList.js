import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

/**
 * 모드에 따라서
 * 정렬되는 기준을 다르게 하는 걸 구현
 */

export const useGagyeListStore = defineStore('todoList', () => {
  const BASE_URI = '/api/gagye';
  // state를 직접 return 하는건 비권장
  const state = reactive({
    gagyeList: [],
    categoryList: [],
  });

  const fetchGagyeList = async () => {
    try {
      const response = await axios.get(BASE_URI);
      console.log(response);
      if (response.statusText === 'OK') {
        state.gagyeList = response.data;
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
        console.log('fetchCategoryList', response.data);
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  // 새로운 TodoItem을 추가합니다.
  // const addTodo = async ({ todo, desc }, successCallback) => {
  //   try {
  //     const payload = { todo, desc };
  //     const response = await axios.post(BASE_URI, payload);
  //     if (response.statusText === 'Created') {
  //       state.todoList.push({ ...response.data, done: false });
  //       successCallback();
  //     } else {
  //       alert('Todo 추가 실패');
  //     }
  //   } catch (error) {
  //     alert('에러발생 :' + error);
  //   }
  // };

  const addGagye = async (
    { date, title, price, category },
    successCallback
  ) => {
    try {
      console.log(title, price);
      const payload = { date, title, price, category };
      const response = await axios.post(BASE_URI, payload);
      if (response.statusText === 'Created') {
        state.gagyeList.push({ ...response.data, done: false });
        // successCallback();
      } else {
        alert('Todo 추가 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
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

  //기존 TodoItem을 삭제합니다.
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(BASE_URI + `/${id}`);
      if (response.statusText === 'OK') {
        let index = state.gagyeList.findIndex((todo) => todo.id === id);
        state.gagyeList.splice(index, 1);
      } else {
        alert('Todo 삭제 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  //기존 TodoItem의 완료여부(done) 값을 토글합니다.
  const toggleDone = async (id) => {
    try {
      let todo = state.gagyeList.find((todo) => todo.id === id);
      let payload = { ...todo, done: !todo.done }; // 또 스프레드 연산자
      const response = await axios.put(BASE_URI + `/${id}`, payload); // patch를 한다면?
      if (response.statusText === 'OK') {
        todo.done = payload.done;
      } else {
        alert('Todo 완료 변경 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  // state를 직접 return 하는건 비권장이므로, 아래와 같이 함
  const gagyeList = computed(() => state.gagyeList);
  const categoryList = computed(() => state.categoryList);
  const isLoading = computed(() => state.isLoading);

  // 계산된 속성
  const doneCount = computed(() => {
    return state.gagyeList.filter((todoItem) => todoItem.done === true).length;
  });

  return {
    gagyeList,
    categoryList,
    isLoading,
    doneCount,
    fetchGagyeList,
    fetchCategoryList,
    addGagye,
    deleteTodo,
    updateTodo,
    toggleDone,
  };
});
