import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../styles/carousal.css";
import ReactTabs from "./reactTabs";
import queryString from "query-string";
import axios from "axios";

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurant: {},
    };
  }

 componentDidMount = async () => {
  // window.location.reload();
    const qs = queryString.parse(this.props.location.search);
    const { restaurant } = qs;

    const response = await axios({
      method: "GET",
      // url: `http://localhost:8030/getRestaurantByRestaurantId/${restaurant}`,
      url: `https://zomato-clone-backend-vija.onrender.com/getRestaurantByRestaurantId/${restaurant}`,
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    this.setState({ restaurant: response.data.restaurants });
  };

  render() {
    const { restaurant } = this.state;
    console.log(restaurant);
    return (
      <div>
        <Carousel showThumbs={false}>
          <div>
            <img className="imgD" src="./assets/breakfast.jpg"></img>
            {/* {restaurant.thumb.map((item) => {
              return <img className="imgD" src={item}></img>;
            })} */}
          </div>
          <div>
          <img className="imgD" src="./assets/dinner.jpg"></img>
          </div>
        </Carousel>

        <h2 style={{ display: "inline",color:"blueviolet" }}>{restaurant.name}</h2>
        <button
          style={{
            marginLeft: 1100,
            backgroundColor: "red",
            color: "white",
            fontSize: 20,
            borderRadius: 5,
          }}
        >
          Place online order
        </button>
        <br></br>
        <br></br>
        <ReactTabs restaurantData={restaurant} />
      </div>
    );
  }
}
export default Details;
