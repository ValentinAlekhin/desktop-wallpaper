<template>
  <div class="app">
    <div class="top">
      <span class="time">{{ time }}</span>
      <div class="about_weather">
        <i class="wi about_icon" :class="weatherIcon" />
        <span class="about_text">{{ aboutText }}</span>
      </div>
    </div>

    <div class="bottom">
      <div class="location">
        <LocationIcon className="location_ico" />
        <span class="city">{{ `${city}, ${code}` }}</span>
      </div>

      <span class="temp">{{ temp }}&degC</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import './scss/style.scss'
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
      weatherIcon: '',
      time: moment().format('HH:mm'),
    }
  },

  methods: {
    setTime() {
      this.time = moment().format('HH:mm')
    },

    setWeatherIcon(id) {
      let className = 'wi-'

      const time = Number.parseInt(moment().format('HH'))
      if (time >= 21 || time <= 5) {
        className += 'night-'
      } else className += 'day-'

      switch (id.toString()[0]) {
        case '2':
          className += 'thunderstorm'
          break
        case '3':
          className += 'sprinkle'
          break
        case '5':
          className += 'rain'
          break
        case '6':
          className += 'snow'
          break
        case '7':
          className += 'fog'
          break
        case '8':
          if (id.toString()[2] === '0') {
            className += 'clear'
          } else className += 'cloudy'
          break
      }

      this.weatherIcon = className
    },

    async setLoacationAndWeather() {
      const { city, country_code, longitude, latitude } = await getLocation()
      const { desc, temp, weatherId } = await getWeather(latitude, longitude)

      this.setWeatherIcon(weatherId)

      this.city = city
      this.code = country_code
      this.aboutText = desc
      this.temp = temp
    },
  },

  created() {
    this.setLoacationAndWeather()
    setInterval(this.setTime, 1000)
    setInterval(this.setLoacationAndWeather, 60 * 60 * 60)
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
      margin-right: 20px;
    }

    .about_weather {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;

      .about_icon:before {
        font-size: 40px;
      }

      .about_text {
        font-size: 32px;
        text-transform: lowercase;
      }
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
        margin-right: 20px;
      }
    }
  }
}
</style>
