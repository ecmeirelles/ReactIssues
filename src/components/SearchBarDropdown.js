import React, { Component } from 'react';
import { Input, Dropdown } from 'semantic-ui-react';

class SearchBarDropdown extends Component {
  state = {
    searchText: "",
    searchCategory: "title"
  };

  options = [
    { key: "number", text: "Number", value: "number" },
    { key: "title", text: "Title", value: "title" },
    { key: "labels", text: "Label", value: "labels" },
    { key: "state", text: "State", value: "state" }
  ];

  onSearch = (textValue, categoryValue) => {
    let { tempData, originalData, onChangeTempData } = this.props;
    tempData = originalData;
    if (textValue !== "") {
      switch (categoryValue) {
        case "title":
        case "state":
          tempData = originalData.filter(data => (
            data[categoryValue].toLowerCase().includes(textValue)
          ));
          break;
        case "number":
          tempData = originalData.filter(data => (
            data[categoryValue].toString().includes(textValue)
          ));
          break;
        case "labels":
          tempData = originalData.filter(data => (
            data.labels.some(label => (
              label.name.toLowerCase().includes(textValue))
            )
          ));
          break;
        default:
          break;
      }
    }
    onChangeTempData(tempData);
  };

  render() {
    const { containerStyle } = this.props;
    const { searchText, searchCategory } = this.state;
    return (
      <div style={containerStyle}>
        <Input
          action={
            <Dropdown
              button
              basic
              floating
              options={this.options}
              defaultValue={searchCategory}
              onChange={(event, data) => {
                this.setState({ searchCategory: data.value });
                this.onSearch(searchText, data.value);
              }}
            />
          }
          icon="search"
          iconPosition="left"
          placeholder="Search..."
          onChange={(event, data) => {
            this.setState({ searchText: data.value });
            this.onSearch(data.value, searchCategory);
          }}
        />
      </div>
    )
  }
}

export default SearchBarDropdown;
