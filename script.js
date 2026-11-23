
async function getWeather() {

  let city = document.querySelector("#city").value;

  let latitude;
  let longitude;

  if (city === "toronto") {
    latitude = 43.65;
    longitude = -79.38;
  } else if (city === "bangkok") {
    latitude = 13.75;
    longitude = 100.50;
  } else {
    latitude = 35.68;
    longitude = 139.69;
  }

  let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;

  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    let data = await response.json();
    let temperature = data.current.temperature_2m;

    document.querySelector("#temperature").textContent =
      temperature + "°C";

    if (temperature < 10) {
      document.body.className = "cold";
      document.querySelector("#message").textContent =
        "It's freezing outside! 🥶";
    } else if (temperature < 25) {
      document.body.className = "mild";
      document.querySelector("#message").textContent =
        "The weather feels pretty nice! 😊";
    } else {
      document.body.className = "hot";
      document.querySelector("#message").textContent =
        "It's a hot day! ☀️";
    }

  } catch (error) {
    document.querySelector("#message").textContent =
      "Could not load weather data.";
    console.error(error);
  }
}
