<template>
  <div>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

contentRowcontentRow
    <div id="app" class="container-fluid">
      <NavBar>
        <MedianChartCard></MedianChartCard>
        <ChartContent></ChartContent>
      </NavBar>
    </div>
  </div>
</template>


<script>
import ChartContent from './components/ChartContent.vue'
import NavBar from './components/NavLayout.vue'
import MedianChartCard from './components/MedianChartCard.vue'

export default {
  name: 'app',
  components: {
    ChartContent,
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
