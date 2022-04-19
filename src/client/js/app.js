import 'regenerator-runtime/runtime'

const app = (event) => {
  event.preventDefault()
  const newLocation = document.querySelector("#location").value;
  const date = daysUntill();
    //updating UI with the info we got from API stored in ProjectData
    const updateUI = (res) =>{
      document.querySelector("#country").innerHTML = `${`${res.location.country}, ${res.location.city} is ${res.location.daysuntill} days away.`}`;
      document.querySelector("#weather").innerHTML = `${`The typical weather for then is: ${res.weather.temp}C°`}`;
      document.querySelector("#weather-description").innerHTML = `${`${res.weather.weather} througout the day.`}`;
      document.querySelector("#img").innerHTML = `<img src="${res.image.pic}" width="350px" height="270px">`;
    }

    postLocation(newLocation, date)
      .then((res) =>{
        updateUI(res, date)
      }).catch((error) => {
        console.log(error, "Error")
      })
}

const postLocation = async (newLocation, date) => {
  const res = await fetch("http://localhost:8088/postLocation", {
    method: "POST",
    credemtials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      newLocation: newLocation,
      date: date
    })
  })
  let resData = await res.json()
  return resData;
}

const daysUntill = ()=>{
  const today = new Date().getTime();
  const dateEntered = new Date(document.querySelector("#departing-date").value).getTime();
  const distance = dateEntered - today;
  const days = Math.round(distance / (1000 * 60 * 60 * 24));
  return days;
};

export { app }
export { postLocation }