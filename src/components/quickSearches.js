import React from "react";
import {withRouter} from "react-router-dom"
class QuickSearches extends React.Component{
    handleNavigate=(mealtypeId)=>{
       const locationId= sessionStorage.getItem("locationId");
       if(locationId){
        this.props.history.push(`/filter?mealType=${mealtypeId}&location=${locationId}`);
        window.location.reload();
       }else{
        this.props.history.push(`/filter?mealType=${mealtypeId}`);
       window.location.reload();
       }
    }
    render(){
        const {name,content,image,meal_type}=this.props.QuickSearcheItemData;
        return(
            
                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 colcol" onClick={()=>this.handleNavigate(meal_type)}>
                    <div className="innerdiv">
                        <img className="img" src={`./${image}`} alt=""/>
                        <h3 className="boxhead">{name}</h3>
                        <p className="boxp">{content}</p>
                    </div>
                </div>
            
            )
        }
    }
    
    export default withRouter(QuickSearches);