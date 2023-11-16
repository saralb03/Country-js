import { createCountry, createCountryByCode, homeCountries, } from "./countryManager.js";

export const declareEvents = () => {
    let id_form = document.querySelector("#id_form")
    let home = document.querySelector("#home")
    // let select_box = document.querySelector("#id_select_country")
    let input_search = document.querySelector("#id_input")
    let israel_li = document.querySelector("#israel_li")
    let USA_li = document.querySelector("#usa_li")
    let russia_li = document.querySelector("#russia_li")
    let italy_li = document.querySelector("#italy_li")
    let parent = document.querySelector("#id_parent")


    israel_li.addEventListener("click", () => {
        createCountryByCode("isr");
    })
    USA_li.addEventListener("click", () => {
        createCountryByCode("USA");
    })
    russia_li.addEventListener("click", () => {
        createCountryByCode("RUS");
    })
    italy_li.addEventListener("click", () => {
        createCountryByCode("ITA");
    })

    id_form.addEventListener("submit", e => {
        e.preventDefault()
        createCountry(input_search.value);
    })

    home.addEventListener("click", () => {
        parent.innerHTML = "";
        homeCountries();
    })
    // select_box.addEventListener("change", () => {
    //     if (select_box.value != "0") {

    //         parent.innerHTML = "";
    //         createCountry(select_box.value);
    //         input_search.value = select_box.value;
    //     }
    // })

}
