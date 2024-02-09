import React from "react";
import "../styles/filter.css";
import queryString from "query-string";
import axios from "axios";

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      locations: [],
      page: 1,
      cuisine: undefined,
      lowCost: undefined,
      highCost: undefined,
      sort: undefined,
      mealType: undefined,
      location: undefined,
      pageCount: undefined,
    };
  }
  componentDidMount = async () => {
    // window.location.reload();
    const qs = queryString.parse(this.props.location.search);
    const { mealType, location } = qs;
    this.setState({ mealType: mealType, location: location });
    const filterObj = {
      mealType: mealType,
      location: location,
      page: 1,
    };

    const response1 = await axios({
      method: "POST",
      // url:"http://localhost:8030/getRestaurantsByFilters",
      url: `https://zomato-clone-backend-vija.onrender.com/getRestaurantsByFilters`,
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    });

    this.setState({
      restaurants: response1.data.restaurants,
      pageCount: response1.data.pageCount,
    });

    const response2 = await axios({
      method: "GET",
      // url:"http://localhost:8030/getAllLocations",
      url: `https://zomato-clone-backend-vija.onrender.com/getAllLocations`,
      headers: { "Content-Type": "application/json" },
    });

    this.setState({
      locations: response2.data.locations,
      pageCount: response2.data.pageCount,
    });
  };

  handleLocationChange = (event) => {
    const location = event.target.value;
    // console.log(location);
    const { mealType, cuisine, page } = this.state;

    const filterObj = {
      mealType: mealType,
      cuisine,
      page,
      location,
    };
    axios({
      method: "POST",
      // url:"http://localhost:8030/getRestaurantsByFilters",
      url: `https://zomato-clone-backend-vija.onrender.com/getRestaurantsByFilters`,
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          restaurants: response.data.restaurants,
          location,
          pageCount: response.data.pageCount,
        });
      })
      .catch((err) => console.log(err));
  };

  handleCuisineChange = (cuisine) => {
    const { mealType, page } = this.state;
    // const index= cuisine.indexOf(cuisineId);
    // if(index == -1){
    //     cuisine.push(cuisineId);
    // }else{
    //     cuisine.splice(index,1)
    // }

    const filterObj = {
      mealType: mealType,
      cuisine,
      page,
    };
    axios({
      method: "POST",
      // url:"http://localhost:8030/getRestaurantsByFilters",
      url: `https://zomato-clone-backend-vija.onrender.com/getRestaurantsByFilters`,
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          restaurants: response.data.restaurants,
          cuisine,
          pageCount: response.data.pageCount,
        });
      })
      .catch((err) => console.log(err));
  };

  handleCostChange = (lowCost, highCost) => {
    const { mealType, cuisine, page, location } = this.state;

    const filterObj = {
      mealType: mealType,
      cuisine,
      page,
      lowCost,
      highCost,
      location,
    };
    axios({
      method: "POST",
      // url:"http://localhost:8030/getRestaurantsByFilters",
      url: `https://zomato-clone-backend-vija.onrender.com/getRestaurantsByFilters`,
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          restaurants: response.data.restaurants,
          lowCost,
          highCost,
          pageCount: response.data.pageCount,
        });
      })
      .catch((err) => console.log(err));
  };

  handleSortChange = (sort) => {
    const { mealType, cuisine, page, lowCost, highCost, location } = this.state;

    const filterObj = {
      mealType: mealType,
      cuisine,
      page,
      sort: sort,
      lowCost,
      highCost,
      location,
    };
    axios({
      method: "POST",
      // url:"http://localhost:8030/getRestaurantsByFilters",
      url: `https://zomato-clone-backend-vija.onrender.com/getRestaurantsByFilters`,

      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          restaurants: response.data.restaurants,
          pageCount: response.data.pageCount,
        });
      })
      .catch((err) => console.log(err));
  };

  handleNavigate = (resId) => {
    this.props.history.push(`/details?restaurant=${resId}`);
  };

  render() {
    // console.log(this.state.restaurants);
    const { restaurants, locations } = this.state;

    return (
      <div>
        <div className="name">Breakfast places in mumbai</div>
        <div className="leftright">
          <div className="left">
            <h2 className="h1">Filters</h2>
            <h2 className="h7">/Sort</h2>
            <i className="bi bi-chevron-down h8"></i>
            <div className="hiddenpart">
              <h5>Select location</h5>
              <select className="cities" onChange={this.handleLocationChange}>
                <option value="none">select location</option>
                <option disabled selected>
                  Select your location
                </option>
                {locations.map((item) => {
                  return (
                    <option value={item.location_id}>
                      {" "}
                      {`${item.name},${item.city}`}
                    </option>
                  );
                })}
              </select>
              <h4>Cuisine</h4>
              <input
                type="radio"
                name="cuisine"
                onChange={() => this.handleCuisineChange(1)}
              />
              North indian
              <br /> <br />
              <input
                type="radio"
                name="cuisine"
                onChange={() => this.handleCuisineChange(2)}
              />
              South indian
              <br /> <br />
              <input
                type="radio"
                name="cuisine"
                onChange={() => this.handleCuisineChange(3)}
              />
              Chinise
              <br /> <br />
              <input
                type="radio"
                name="cuisine"
                onChange={() => this.handleCuisineChange(4)}
              />
              Fast food
              <br /> <br />
              <input
                type="radio"
                name="cuisine"
                onChange={() => this.handleCuisineChange(5)}
              />
              Street food
              <h4>Cost or two</h4>
              <input
                type="radio"
                name="cost"
                onChange={() => this.handleCostChange(1, 500)}
              />
              Less thn 500
              <br /> <br />
              <input
                type="radio"
                name="cost"
                onChange={() => this.handleCostChange(500, 1000)}
              />
              500 to 1000
              <br /> <br />
              <input
                type="radio"
                name="cost"
                onChange={() => this.handleCostChange(1000, 1500)}
              />
              1000 to 1500
              <br /> <br />
              <input
                type="radio"
                name="cost"
                onChange={() => this.handleCostChange(1500, 2000)}
              />
              1500 to 2000
              <br /> <br />
              <input
                type="radio"
                name="cost"
                onChange={() => this.handleCostChange(2000, 50000)}
              />
              2000+
              <h4>sort</h4>
              <input
                type="radio"
                name="sort"
                onChange={() => this.handleSortChange(1)}
              />
              Price low to high
              <br /> <br />
              <input
                type="radio"
                name="sort"
                onChange={() => this.handleSortChange(-1)}
              />
              Price high to low
              <br /> <br />
            </div>
          </div>

          <div className="main">
            {restaurants.map((item) => {
              return (
                <div
                  className="rest2"
                  onClick={() => this.handleNavigate(item._id)}
                >
                  <div className="title1">
                    <div className="image">
                      <img className="image1" src={`./${item.image}`} alt="" />
                    </div>
                    <div className="contain1">
                      <h3>{item.name}</h3>
                      <h5>{item.locality}</h5>
                      <p>{item.city}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="info1">
                    <p className="p1"> Cuisine : </p>
                    <p className="p2">
                      {item.cuisine.map(
                        (cuisineItem) => `${cuisineItem.name} | `
                      )}
                    </p>
                    <br />
                    <p className="p3"> cost for two</p>
                    <p className="p4"> &#8377; {item.min_price}</p>
                  </div>
                </div>
              );
            })}

            <div className="nextpage">
              <div className="pages">&lt;</div>
              <div className="pages page2 ">1</div>
              <div className="pages">&gt;</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Filter;
