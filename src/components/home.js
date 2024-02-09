import React from "react";
import axios from "axios";
import Wallpaper from "./wallpaper";
import QuickSearch from "./quickSearch";


class Home extends React.Component{
    constructor(){
        super();
        this.state={
            locations:[],
            mealtypes:[]
        }
    }
    componentDidMount = async () => {
        // sessionStorage.clear();
        const response = await axios({
            method:"GET",
            // url:"http://localhost:8030/getAllLocations",
            url:`https://zomato-clone-backend-vija.onrender.com/getAllLocations`,
            headers: {'Content-Type':'application/json'}
        });
        // console.log(response);
        this.setState({locations:response.data.locations});

        axios({
            method:"GET",
            // url:"http://localhost:8030/getAllMealTypes",
            url:`https://zomato-clone-backend-vija.onrender.com/getAllMealTypes`,
            headers: {'Content-Type':'application/json'}
        })
        .then(response=>{   
            console.log(response);
            this.setState({mealtypes:response.data.mealtypes})
        })
        .catch (err=>console.log(err))
    }
    render(){
        const {locations,mealtypes} =this.state;
        return(
    <div>
        
        <Wallpaper locationsData={locations}/>
        <QuickSearch mealtypesData={mealtypes}/>
    </div>
        )
        }
}
export default Home