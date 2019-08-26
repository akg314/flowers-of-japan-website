<template>
  <div>
    <div id="app" class="container-fluid">
      <NavBar>
        <MedianChartCard></MedianChartCard>
      </NavBar>
    </div>
  </div>
</template>


<script>
//import SearchByLocationChart from './components/SearchByLocationChart.vue'
import NavBar from './components/NavLayout.vue'
import MedianChartCard from './components/MedianChartCard.vue'

export default {
  name: 'app',
  components: {
   // SearchByLocationChart,
    NavBar,
    MedianChartCard
  }
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background-color: pink !important;
}
</style>
