const { createApp } = Vue

createApp({
  data() {
    return {
        message: "Xin chào VueJS Demo 33",
        number: 20
    }
  },
  methods:{
    sayHi(){
        return 'Đây là một phương thức Demo33'
    }
 }
}).mount('#interpolation2')