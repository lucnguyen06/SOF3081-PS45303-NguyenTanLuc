<template>
    <div class="bg-primary p-3 rounded text-center text-light mb-3">
        <CustomInput v-model="inputValue"/>
        <p>Input value: {{ inputValue }}</p>
    </div>
</template>
<script>
import {ref} from 'vue';
import CustomInput from './CustomInput.vue';
export default{
    components: { CustomInput},
    setup(){
        const inputValue = ref('');
        return {
            inputValue,
        };
    },
};
</script>