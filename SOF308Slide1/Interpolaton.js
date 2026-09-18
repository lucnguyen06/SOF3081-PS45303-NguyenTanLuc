const { createApp } = Vue

createApp({
  data() {
    return {
        message: "Xin chào VueJS Demo 33",
        number: 20,
        content: "xin chào các bạn"
    }
  },
  methods:{
    sayHi(){
        return 'Đây là một phương thức Demo33'
    }
 }
}).mount('#inter')