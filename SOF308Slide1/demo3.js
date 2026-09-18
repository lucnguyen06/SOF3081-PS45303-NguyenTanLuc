
Vue.createApp({
    data: function(){
        return {
            message: "Xin chào VueJS",
            number: 10
        }
    },
    methods:{
        sayHi(){
            return 'Đây là một phương thức'
        }
    }
}).mount('#interpolation')

