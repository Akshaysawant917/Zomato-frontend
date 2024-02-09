import React from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css";

class ReactTabs extends React.Component{
    render(){
        const {restaurantData}=this.props;
        return(

            <div>
                <Tabs>
                    <TabList>
                        <Tab>Overview</Tab>
                        <Tab>Contct</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>About this place</h2>
                        <h6>Rating:{restaurantData.aggregate_rating}</h6>
                        <h6>Rating{restaurantData.rating_text}</h6>
                        <h6>Min price:{restaurantData.min_price}</h6>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <h6>Contact no</h6>
                            <div style={{color:"red"}}>{restaurantData.contact_number }</div>
                            <h3 style={{ display: "inline", color:"blueviolet" }}>{restaurantData.name}</h3>
                         
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}
export default ReactTabs 
