<template>
  <div class="home-container">
    <div class="background-image">
      <img
        src="@/assets/piggy.gif"
        alt="Piggy"
        class="main-image"
        @click="goToExpense"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToExpense = () => {
  router.push({ name: 'expense' });
};
</script>

<style scoped>
.home-container {
  position: relative;
  height: 100vh; /* 전체 화면 높이 */
  width: 100vw;
  overflow: hidden;
}

.background-image {
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/money.png');
  background-repeat: repeat;
  background-size: 300px 150px;
  animation: scroll 2s linear infinite;
}

@keyframes scroll {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0px 300px;
  }
}

.main-image {
  position: absolute; /* 이미지를 고정된 위치에 배치 */
  top: 50%; /* 이미지의 세로 중심을 화면의 세로 중심에 맞춤 */
  left: 50%; /* 이미지의 가로 중심을 화면의 가로 중심에 맞춤 */
  transform: translate(-50%, -50%); /* 이미지의 중심점을 맞춤 */
  max-width: 50%; /* 이미지의 최대 너비를 화면의 80%로 제한 */
  max-height: 50%; /* 이미지의 최대 높이를 화면의 80%로 제한 */
  width: auto; /* 자동 너비 */
  height: auto; /* 자동 높이 */
  cursor: pointer; /* 커서 모양 변경 (클릭 가능한 느낌을 주기 위해) */
}
</style>
