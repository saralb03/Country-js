export default class Country {
  constructor(_parent, _item, _homeCountries, _getNameByCode, _createCountryByCode) {
    this.parent = _parent;
    this.name = _item.name.common;
    this.pop = `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()}M`;
    this.capital = _item.capital ? _item.capital : "none";
    this.languages = _item.languages ? Object.values(_item.languages).join() : "none";
    this.flag = _item.flags.png;
    this.lat = _item.latlng[0];
    this.lon = _item.latlng[1];
    this.countryCode = _item.cca3;
    this.borders = _item.borders;
    this.homeCountries = _homeCountries;
    this.getNameByCode = _getNameByCode;
    this.createCountryByCode = _createCountryByCode;
  }

  async render() {
    let myDiv = document.createElement("div");
    myDiv.className = "";
    document.querySelector(this.parent).append(myDiv);
    document.querySelector(this.parent).className = "row";
    myDiv.innerHTML = `
      <div class="card bigbox" data-aos="zoom-out-down" data-aos-duration="1000">
        <div class="card-body Mcard-body d-md-flex p-0 justify-content-lg-between">
          <div class="card-text restCardBody">
            <h1 class="card-header Mcard-header text-center">${this.name}</h1>
            <p class="card-text Mcard-text">Population: ${this.pop}.</p>
            <p class="card-text Mcard-text">Capital: ${this.capital}. </p>
            <p class="card-text Mcard-text" id="id_borders"> This borders: </p>
            <p class="card-text Mcard-text">Languages: ${this.languages}. </p>
            <button id="homebtn" class="btn btn-light my-3 ms-2">Home  <i class="fa fa-home" aria-hidden="true"></i></button>
            <div>
              <img src="${this.flag}" alt="${this.name}" class="border">
            </div>
          </div>
          <div class="restCardBody">
            <div class="Mymap">
              <iframe width="100%" height="100%" frameborder="0" scrolling="yes" marginheight="0" marginwidth="0"
                src="https://maps.google.com/maps?q=${this.lat},${this.lon}&hl=es&z=14&amp;output=embed">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    `;
    document.querySelector("#id_borders").innerHTML += "none";

    let btn = myDiv.querySelector("#homebtn");
    let bordersElement = document.querySelector("#id_borders");

    // Display borders
    if (this.borders && this.borders.length > 0) {
      // Use Promise.all to wait for all promises to resolve
      const borderNames = await Promise.all(this.borders.map(borderCode => this.getNameByCode(borderCode)));
      let bordersList = borderNames.join(", ");
      bordersElement.innerHTML = `This borders: ${bordersList}`;
    } else {
      bordersElement.innerHTML = "No neighboring countries.";
    }

    btn.addEventListener("click", () => {
      document.querySelector(this.parent).innerHTML = "";
      this.homeCountries();
    });
  }

  previewRender() {
    let myDiv = document.createElement("div");
    myDiv.className = "d-flex justify-content-center my-3 text-center";
    document.querySelector(this.parent).append(myDiv);
    document.querySelector(this.parent).className = "row row-cols-lg-3 row-cols-md-2 justify-content-around";
    myDiv.innerHTML += `
      <div class="card myCard h-100 bg-light" data-aos="zoom-in-up" data-aos-duration="1500">
        <img src="${this.flag}" class="card-img-top myCardImg border" width="100%" alt="${this.name}">
        <div class="card-body">
          <p class="myCardText card-text Mcard-text m-0 p-3">Name: ${this.name} </p>
        </div>
      </div>
    `;

    myDiv.querySelector(".myCard").addEventListener("click", () => {
      document.querySelector("#id_parent").innerHTML = "";
      this.render();
    });
  }
}

