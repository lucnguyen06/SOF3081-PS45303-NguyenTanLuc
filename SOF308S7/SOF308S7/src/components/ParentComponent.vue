
<script setup>
    import ChildComponent from './ChildComponent.vue';
    const handleEvent=(data) => {
     alert(data);
    }
</script>

<template>
    <ChildComponent @my-event="handleEvent" />
</template>

<style scoped>

</style>