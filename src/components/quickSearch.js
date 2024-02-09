import React from "react";
import QuickSearches from "./quickSearches";
class QuickSearch extends React.Component {
  render() {
    const { mealtypesData } = this.props;
    return (
      <div className="container">
        <div className="write">
          <h4>Quick Serches</h4>
          <br />
          Discover restaurats by typr your meal
          <br />
          <br />
          <br />
        </div>
        <div className="container-fluid">
          <div className="row gy-2">
            {mealtypesData.map((item) => {
              return <QuickSearches QuickSearcheItemData={item} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default QuickSearch;
