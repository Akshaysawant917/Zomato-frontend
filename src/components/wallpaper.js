import React from "react";
import "../styles/home.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
class Wallpaper extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      inputText: "",
      suggestions: [],
    };
  }
  handleLocation = (event) => {
    const locationId = event.target.value;
    console.log(locationId);
    sessionStorage.setItem("locationId", locationId);
    axios({
      method: "GET",
      // url:`http://localhost:8030/getRestaurantsByLocationId/${locationId}`,
      url: `https://zomato-clone-backend-vija.onrender.com/getRestaurantsByLocationId/${locationId}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        this.setState({ restaurants: response.data.restaurants });
      })
      .catch((err) => console.log(err));
  };
  handleSearch = (event) => {
    const inputText = event.target.value;
    const { restaurants } = this.state;
    const suggestions = restaurants.filter((item) =>
      item.name.toLowerCase().includes(inputText.toLowerCase())
    );
    this.setState({ inputText, suggestions });
  };
  showSuggestions = () => {
    const { suggestions, inputText } = this.state;
    if (suggestions.length == 0 && inputText == undefined) {
      return null;
    }
    if (suggestions.length > 0 && inputText == "") {
      return null;
    }
    if (suggestions.length == 0 && inputText) {
      return (
        <ul className="sugbox">
          <li>NO result found</li>
        </ul>
      );
    }
    return (
      <ul>
        {suggestions.map((item, index) => (
          <li
            className="sugbox"
            key={index}
            onClick={() => this.selectingRestaurants(item)}
          >{`${item.name}-${item.locality},${item.city}`}</li>
        ))}
      </ul>
    );
  };
  selectingRestaurants = (resObj) => {
    this.props.history.push(`/details?restaurant=${resObj._id}`);
    window.location.reload();
  };

  render() {
    const { locationsData } = this.props;
    return (
      <div className="container-fluid bg">
        {/* <div className="buttonsHome">  
         <button class="button1">Login</button>
         <button class="button2">Create an acount</button>
     </div> */}
        <div className="logo">e!</div>
        <div className="heading">Find the best restaurants, cafes and bars</div>
        <div className="search container">
          <div className="row ">
            <div className="datalist offset-lg-3 col-lg-3 col-sm-12 offset-md-4 col-md-5 ">
              <select
                className="select"
                name="cities"
                id="cities"
                onChange={this.handleLocation}
              >
                <option disabled selected>
                  Select your location
                </option>
                {locationsData.map((item) => {
                  return (
                    <option value={item.location_id}>
                      {" "}
                      {`${item.name},${item.city}`}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="search2 offset-lg-0 col-lg-3 offset-md-4 col-md-5 col-sm-12">
              <i className="bi bi-search icon"></i>
              <input
                className="input"
                placeholder="Search for restaurants"
                type="text"
                onChange={this.handleSearch}
              />
              {this.showSuggestions()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Wallpaper);
