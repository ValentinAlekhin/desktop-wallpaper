<template>
  <div class="app">
    <div class="top">
      <span class="time">{{ time }}</span>
      <div class="about_weather">
        <span class="about_text">{{ aboutText }}</span>
      </div>
    </div>

    <div class="bottom">
      <div class="location">
        <LocationIcon className="location_ico" />
        <span class="city">{{ `${city}, ${code}` }}</span>
      </div>

      <span class="temp">{{ temp + '&deg C' }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { getLocation, getWeather } from './api/api'

import LocationIcon from './icons/location'

export default {
  components: {
    LocationIcon,
  },

  data() {
    return {
      aboutText: '',
      city: '',
      code: '',
      temp: '',
      time: moment().format('HH:mm'),
    }
  },

  methods: {
    setTime() {
      this.time = moment().format('HH:mm')
    },

    async setLoacationAndWeather() {
      const { city, country_code, longitude, latitude } = await getLocation()
      const { desc, temp, weatherId } = await getWeather(latitude, longitude)

      this.city = city
      this.code = country_code
      this.aboutText = desc
      this.temp = temp
    },
  },

  created() {
    this.setLoacationAndWeather()
    setInterval(this.setTime, 1000)
    // setInterval(this.setLoacationAndWeather, 60 * 60 * 60)
  },
}
</script>

<style lang="scss">
$background_color: #414141;
$accent_color: #82c7fe;

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background: $background_color;
  font-family: Roboto;
  color: $accent_color;
}

.app {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .top {
    display: flex;
    margin-bottom: 30px;

    .time {
      font-size: 150px;
      line-height: 72%;
      font-weight: 200;
    }

    .about_weather {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    font-size: 30px;
    background: darken($background_color, 2);
    border-radius: 20px;
    box-shadow: 0px 0px 10px 3px rgb(51, 51, 51);

    .location {
      display: flex;
      align-items: center;

      .location_ico {
        height: 30px;
        width: 30px;
        fill: $accent_color;
        margin-right: 10px;
      }
    }
  }
}
</style>
