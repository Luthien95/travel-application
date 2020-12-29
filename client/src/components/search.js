import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.addInputData = this.addInputData.bind(this);
    this.changeArticleSort = this.changeArticleSort.bind(this);
  }

  addInputData(e) {
    let titleValue = e.target.value;

    this.props.loadPostWithStringInTitle(titleValue);
  }

  changeArticleSort(e) {
    if (e.target.value === "ascending") {
      this.props.loadPostWithDateAscending();
    } else {
      this.props.loadPostWithDateDescending();
    }
  }

  render() {
    return (
      <div>
        <button>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <div>
          <input
            type="search"
            name="titleSearchString"
            placeholder="Search in title..."
            onChange={this.addInputData}
          />
          <label htmlFor="sort">Sort by:</label>
          <select
            name="sort"
            id="sort"
            value={this.state.selectValue}
            defaultValue="descending"
            onChange={this.changeArticleSort}
          >
            <option value="ascending">Date ascending</option>
            <option value="descending">Date descending</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Search;
