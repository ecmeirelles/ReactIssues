import React, { Component } from "react";
import fetchIssues from "../services/fetchIssues";
import Loading from "./Loading";
import SearchBarDropdown from "./SearchBarDropdown";
import StatusTable from "./StatusTable";

class App extends Component {
  state = {
    issues: null,
    originalData: null
  };

  componentDidMount() {
    fetchIssues().then((data) => {
      this.setState({ issues: data, originalData: data });
    });
  }

  render() {
    const { issues, originalData } = this.state;
    return (
      <div style={{ margin: 30 }}>
        <h1 style={{ textAlign: "center", marginBottom: 30 }}>
          React Issues
        </h1>
        { issues === null ?
          <Loading
            visible={issues === null}
            containerStyle={{ marginTop: 30 }}
          />
          :
          <div>
            <SearchBarDropdown
              originalData={originalData}
              tempData={issues}
              containerStyle={{ textAlign: "right" }}
              onChangeTempData={(issues) => this.setState({ issues })}
            />
            <StatusTable
              statuses={issues}
              onChangeStatuses={(issues) => this.setState({ issues })}
            />
          </div>
        }
      </div>
    );
  }
}

export default App;
