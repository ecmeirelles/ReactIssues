import React, { Component } from "react";
import { Loader } from "semantic-ui-react";

class Loading extends Component {
  render() {
    const { containerStyle } = this.props;
    return (
      <div style={containerStyle}>
        <Loader active inline="centered" />
        <p style={{ marginTop: 8, textAlign: "center" }}>
          Loading
        </p>
      </div>
    )
  }
}

export default Loading;
