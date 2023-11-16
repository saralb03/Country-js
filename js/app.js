import { getCountries,homeCountries } from "./countryManager.js";
import { declareEvents } from "./event.js";

const init = () => {
  doApi();
  declareEvents();
};
const doApi = async () => {
  let url = "https://restcountries.com/v3.1/all";
  let resp = await fetch(url);
  let data = await resp.json();
  getCountries(data);
  homeCountries();
};

init();
