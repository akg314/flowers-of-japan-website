<template>
  <div class='col-4' id="mapTextBox">
          <div class="row">
          <!--bloom-->
          <div class="row">
            <div class='col-12'>
            <table class='table-sm'>
              <thead>
                <tr>
                  <th></th>
                  <th>2019</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    First bloom
                    &#x1F331
                  </th>
                  <td>May 3</td>
                </tr>
                <tr>
                  <th>
                    Full bloom
                    &#x1F338
                  </th>
                  <td>May 6</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
          <!--choice locations-->
          <div class="row">
            <p class='col-12 text-center'>Best viewing spots</p>
            <div class="col-6">
              Maruyama Park
              <img class='img-fluid img-thumbnail' src="https://www.japan-guide.com/g3/5316_maruyama.jpg"/>
            </div>
            <div class="col-6">
              Odori Park
              <img class='img-fluid img-thumbnail' src='https://www.japan-guide.com/g3/5316_odori.jpg'/>
            </div>
          </div>
          <!--explore booking options-->
          <div class="row">
            <div class='col-12 text-center'>Let's plan a trip!</div>
            <div class="col-4">
              <!--agoda-->
              <img class='img-fluid align-text-bottom' src='https://s1.qwant.com/thumbr/469x200/9/a/9ec174bfbd5bccf8cb3f87f03305281fb758130f4e13ade1bc620b51869231/Agoda_logo.png?u=http%3A%2F%2Flogos-download.com%2Fwp-content%2Fuploads%2F2016%2F08%2FAgoda_logo.png'/>
            </div>
            <div class="col-4">
              <!--airbnb-->
             <img class='img-fluid align-text-bottom' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1280px-Airbnb_Logo_B%C3%A9lo.svg.png'/>
            </div>
            <div class="col-4">
             <img class='img-fluid align-text-bottom' src='https://www.stickpng.com/assets/images/589a4c2b5aa6293a4aac48c9.png'/>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
  export default {
    name: 'MapInfoContainer'
  }
</script>
<style>
  #mapTextBox {
    background-color: white;
    padding: 20px;
  }
</style>