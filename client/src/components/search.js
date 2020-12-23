import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.addInputData = this.addInputData.bind(this);
  }

  addInputData(e) {
    let titleValue = e.target.value;

    this.props.loadPostWithStringInTitle(titleValue);
  }

  render() {
    return (
      <div>
        <button>Wyszukaj...</button>
        <div>
          <input
            type="search"
            name="titleSearchString"
            placeholder="Search in title..."
            onChange={this.addInputData}
          />
        </div>
      </div>
    );
  }
}

export default Search;
