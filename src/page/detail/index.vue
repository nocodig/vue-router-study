<template>
  <div>
    这个是详情页面
    <div>方式一通过路由对象获取： {{$route.params.id}}</div>
    <div>方式二通过props属性获取： {{id}}</div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: ['id']
}
</script>

<style>

</style>