<script setup>
import ClassBinding from './components/ClassBinding.vue';
import ClassBindingArray from './components/ClassBindingArray.vue';
import HelloWorld from './components/HelloWorld.vue'
import OnewayDataBinding from './components/OnewayDataBinding.vue';
import ReactiveDemo from './components/ReactiveDemo.vue';
import ReactiviteObj from './components/ReactiviteObj.vue';
import RefBindingReactive from './components/RefBindingReactive.vue';
import RefBindingObj from './components/RefBindingReactive.vue';
import RefDemo from './components/RefDemo.vue';
import RefReactivity from './components/RefReactivity.vue';
import StyleBinding from './components/StyleBinding.vue';
import StyleBindingDemo from './components/StyleBindingDemo.vue';
import TowwayDataBinding from './components/TowwayDataBinding.vue';

import {ref} from 'vue'
import CreatePost from './components/CreatePost.vue';
import PostList from './components/PostList.vue';
const posts = ref([])
function addPost(post){
  posts.value.push(post)
}


</script>

<template>
  
  <HelloWorld></HelloWorld>
  <OnewayDataBinding></OnewayDataBinding>
  <TowwayDataBinding></TowwayDataBinding>
   <!--

  <RefReactivity></RefReactivity>
 
  <ReactiviteObj></ReactiviteObj>

  <RefDemo></RefDemo>
  <ReactiveDemo></ReactiveDemo>
 
  <ClassBinding></ClassBinding>
  <ClassBindingArray></ClassBindingArray>

  <StyleBinding></StyleBinding>
  <StyleBindingDemo></StyleBindingDemo>

 
  <RefBindingReactive></RefBindingReactive>

   -->
  <!-- Bai tap: Cho nhap 2 so -> Cong, Tru, Nhan, Chia -->

  <div id="app">
    <h1>Ứng dụng Blog nhỏ voi Vue.js</h1>
    <CreatePost @add-post="addPost"/>
    <PostList :posts="posts"/>
  </div>
  
</template>

<style scoped>
#app{
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
