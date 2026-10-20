<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>FORM BINDING</h1>
    <div>
      <label for="name">Tên:</label>
      <input id="name" v-model="name" type="text">
      <p>Tên của bạn là: {{ name }}</p>
      <hr>
      <h4>Multiline text</h4>
      <span>Để lại góp ý tại đây:</span>
      <p>{{ message }}</p>
      <textarea v-model="message" placeholder="Nội dung góp ý..."></textarea>
      <hr>
      <h4>Check box</h4>
      <div>
        <label>
          <input type="checkbox" v-model="isChecked">
          Chấp nhận điều khoản
        </label>
        <p>Trạng thái: {{ isChecked ? 'Đã chấp nhận' : 'Chưa chấp nhận' }}</p>
      </div>
      <hr>
      <h4>Multiple Checkboxes</h4>
      <div>
        <input type="checkbox" value="HTML" v-model="checkedNames">HTML <br>
        <input type="checkbox" value="CSS" v-model="checkedNames">CSS <br>
        <input type="checkbox" value="JavaScript" v-model="checkedNames">JavaScript <br>
        <p>Ngôn ngữ bạn chọn: {{ checkedNames.join(', ') }}</p>
      </div>
      <hr>
      <h4>Select/Option</h4>
      <div>
        <label for="fruit">Chọn loại trái cây: </label>
        <select id="fruit" v-model="selectedFruit">
          <option value="Apple">Táo</option>
          <option value="Banana">Chuối</option>
          <option value="Orange">Cam</option>
        </select>
        <p>Trái cây bạn chọn là: {{ selectedFruit }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>
<script setup>
  import {ref} from 'vue';
  const name = ref("TeoLV");
  const message = ref('');
  const isChecked = ref(false);
  const checkedNames = ref([]);
  const selectedFruit = ref('Apple');
</script>