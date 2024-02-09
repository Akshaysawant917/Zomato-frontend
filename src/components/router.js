import React from "react";
import {Route, BrowserRouter} from "react-router-dom";
import Home from "./home";
import Details from "./details";
import Filter from "./filter";
import Header from "./header";
function Router() {
    return(
        <BrowserRouter>
        <Route path="*" component={Header}/>
        <Route exact path="/" component ={Home}/>
        <Route path="/filter" component ={Filter}/>
        <Route path="/details" component ={Details}/>
        </BrowserRouter>
    )
}
export default Router