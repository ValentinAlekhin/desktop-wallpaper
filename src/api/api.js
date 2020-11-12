const abstractKey = process.env.VUE_APP_ABSTRACTAPI_KEY
const weatherKey = process.env.VUE_APP_WEATHERAPI_KEY

const getLocation = async () => {
  const response = await fetch(
    `https://ipgeolocation.abstractapi.com/v1/?api_key=${abstractKey}`
  )
  return await response.json()
}

const getWeather = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric`
  )
  const {
    main: { temp },
    weather: [{ id, main }],
  } = await response.json()

  return { temp: Math.round(temp), weatherId: id, desc: main }
}

export { getLocation, getWeather }
