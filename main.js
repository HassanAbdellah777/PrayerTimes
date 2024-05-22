let dateDay = document.querySelector(".date-sec .day span");
let dateHijri = document.querySelector(".hijri span");
let dateGeorgian = document.querySelector(".georgian span");
let countryName = document.querySelector(".country span");
let cityName = document.querySelector(".city span");
let fajr = document.querySelector(".fajr span");
let sunrise = document.querySelector(".sunrise span");
let duhr = document.querySelector(".duhr span");
let asr = document.querySelector(".asr span");
let maghrib = document.querySelector(".maghrib span");
let ishaa = document.querySelector(".ishaa span");
let selectedCity = document.getElementById("city");

//Change City
selectedCity.addEventListener("change", () => {
  switch (selectedCity.value) {
    case 0:
      setData("القاهرة");
      break;
    case 1:
      setData("الاسكندرية");
      break;
    case 2:
      setData("الاقصر");
      break;
    case 3:
      setData("أسوان");
      break;
  }
});
function init() {
  setData("Cairo");
}

// Fetching Data
async function setData(city) {
  const responseData = await fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`
  );
  const response = await responseData.json();
  console.log(response);
  //Full Date Month Readable
  console.log(response.data.date.readable);
  dateGeorgian.textContent =
    response.data.date.gregorian.weekday.en + " " + response.data.date.readable;
  //Date Day Hijri
  console.log(response.data.date.hijri.date);
  dateHijri.textContent =
    response.data.date.hijri.weekday.ar +
    "  " +
    response.data.date.hijri.date +
    "  " +
    response.data.date.hijri.month.ar;
  //Day Hijri Arabic
  console.log(response.data.date.hijri.day);
  //Month Hijri Arabic
  console.log(response.data.date.hijri.month.ar);

  console.log(response.data.date.hijri.weekday.ar);

  //Week Day
  console.log(response.data.date.gregorian.weekday.en);
  // dateDay.textContent =
  //   response.data.date.hijri.weekday.ar +
  //   "   " +
  //   response.data.date.gregorian.weekday.en;
  //Prayer Timings
  console.log("Fajr from setData: ", response.data.timings.Fajr);
  fajr.textContent = convertTo12HourFormat(response.data.timings.Fajr);
  console.log("Sunrise setData: ", response.data.timings.Sunrise);
  sunrise.textContent = convertTo12HourFormat(response.data.timings.Sunrise);
  console.log("Dhuhr  setData: ", response.data.timings.Dhuhr);
  duhr.textContent = convertTo12HourFormat(response.data.timings.Dhuhr);
  console.log("Asr setData: ", response.data.timings.Asr);
  asr.textContent = convertTo12HourFormat(response.data.timings.Asr);
  console.log("Maghrib setData: ", response.data.timings.Maghrib);
  maghrib.textContent = convertTo12HourFormat(response.data.timings.Maghrib);
  console.log("Isha setData: ", response.data.timings.Isha);
  ishaa.textContent = convertTo12HourFormat(response.data.timings.Isha);
}

//Convert time to 24hours AM/PM
function convertTo12HourFormat(time24) {
  // Split the time into hours and minutes
  console.log(time24, typeof time24);
  let [hours, minutes] = time24.split(":");
  // Convert hours to a number
  hours = parseInt(hours);
  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";
  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12 || 12; // Converts '0' hour to '12' for midnight case
  // Return formatted time
  return `${hours}:${minutes} ${period}`;
}
//local Time
function updateTime() {
  const d = new Date();
  const timeString = d.toLocaleTimeString();
  dateDay.textContent = timeString;
}
// Initial call to display the time immediately
updateTime();

// Update the time every second (1000 milliseconds)
setInterval(updateTime, 1000);

init();
