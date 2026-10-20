<template>
    <div class="container">
    <div class="row">
		<div class="span12">
			<form class="form-horizontal" @submit.prevent="handleLogin">
			  <fieldset>
			    <div id="legend">
			      <legend class="">Login</legend>
			    </div>
			    <div class="control-group">
			      <!-- Username -->
			      <label class="control-label"  for="username">Username</label>
			      <div class="controls">
			        <input type="text" id="username" name="username" placeholder="Nhập username" class="input-xlarge" required>
			      </div>
			    </div>
			    <div class="control-group">
			      <!-- Password-->
			      <label class="control-label" for="password">Password</label>
			      <div class="controls">
			        <input type="password" id="password" name="password" placeholder="Nhập password" class="input-xlarge" required>
			      </div>
			    </div>
			    <div class="control-group">
			      <!-- Button -->
			      <div class="controls">
			        <button class="btn btn-success">Login</button>
			      </div>
			    </div>
			  </fieldset>
			</form>
		</div>
	</div>
</div>



    <div v-if="storedData">
      <h3>Thông tin đã lưu trong LocalStorage:</h3>
      <p><strong>Tên đăng nhập:</strong> {{ storedData.username }}</p>
      <p><strong>Mật khẩu:</strong> {{ storedData.password }}</p>
    </div>

</template>

<style scoped>

</style>

<script>
export default{
  data() {
    return {
      username: '',
      password: '',
      storedData: null,
    };
  },
  mounted() {
    // Kiểm tra dữ liệu đã lưu trong LocalStorage khi ứng dụng tải
    const data = localStorage.getItem('loginData');
    if (data) {
      this.storedData = JSON.parse(data);
    }
  },
  methods: {
    handleLogin() {
      // Lưu thông tin đăng nhập vào LocalStorage
      const loginData = {
        username: this.username,
        password: this.password,
      };
      localStorage.setItem('loginData', JSON.stringify(loginData));

      // Cập nhật dữ liệu hiển thị
      this.storedData = loginData;

      alert('Đăng nhập thành công và đã lưu thông tin vào LocalStorage!');
      
      // Xóa thông tin trên form
      this.username = '';
      this.password = '';
      this.$router.push({name: 'Dashboard'});
    },
  },
} 
</script>