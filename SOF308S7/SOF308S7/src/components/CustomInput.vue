<template>
    <input :value="modelValue" @input="updateValue"/>
</template>

<script>
export default{
    props:['modelValue'], //Nhan gia tri tu v-model
    methods:{
        updateValue(event){
            //Phát sự kiện để update giá trị
            this.$emit('update:modelValue',event.target.value);
        }
    }
}
</script>