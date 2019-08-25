<template>
  <div>
    <div class="row">
      <!--side-nav-bar-->
      <div class='col-2 titleNav'>
        <div class="col-12">
        Flower Japan
        </div>
        <div class='col-12'>
            Flower 1
        </div>
        <div class='col-12'>
          Flower 2
        </div>
        <div class='col-12'>
          Flower 3
        </div>
     </div>
     <!--slot for main content-->
     <div class='col-10'>
        <slot></slot>
     </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar'
  }
</script>
<style>
</style>
