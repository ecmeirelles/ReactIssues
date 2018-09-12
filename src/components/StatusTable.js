import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";
import "../style/table.css";

class StatusTable extends Component {
  state = {
    column: null,
    direction: null,
  };

  handleSort = clickedColumn => () => {
    const { statuses, onChangeStatuses } = this.props;
    const { column, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        direction: "ascending"
      });
      onChangeStatuses(statuses.sort((a, b) => clickedColumn === "number"
        ? a.number - b.number
        : new Date(a[clickedColumn]) - new Date(b[clickedColumn]))
      )
    } else {
      this.setState({ direction: direction === "ascending" ? "descending" : "ascending" });
      onChangeStatuses(statuses.reverse());
    }
  };

  render() {
    return (
      <Table columns={6} sortable celled fixed>
        <Table.Header>
          { this.renderHeader() }
        </Table.Header>
        <Table.Body>
          { this.renderContent() }
        </Table.Body>
      </Table>
    )
  }
  renderHeader() {
    const { column, direction } = this.state;
    return (
      <Table.Row>
        <Table.HeaderCell
          sorted={column === "number" ? direction : null}
          onClick={this.handleSort("number")}
        >
          Issue Number
        </Table.HeaderCell>
        <Table.HeaderCell>
          Title
        </Table.HeaderCell>
        <Table.HeaderCell
          sorted={column === "created_at" ? direction : null}
          onClick={this.handleSort("created_at")}
        >
          Created At
        </Table.HeaderCell>
        <Table.HeaderCell
          sorted={column === "updated_at" ? direction : null}
          onClick={this.handleSort("updated_at")}
        >
          Updated At
        </Table.HeaderCell>
        <Table.HeaderCell>
          Labels
        </Table.HeaderCell>
        <Table.HeaderCell>
          State
        </Table.HeaderCell>
      </Table.Row>
    )
  }
  renderContent() {
    const { statuses } = this.props;

    if (statuses.length === 0) {
      return (
        <Table.Row key={Math.random()}>
          <Table.Cell colSpan="6" textAlign={"center"}>
            <div style={{ margin: 15 }}>
              <Icon name="dont" />
              <p>No results</p>
            </div>
          </Table.Cell>
        </Table.Row>
      )
    }
    return (
      statuses.map(status => {
      const positive = status.state.toLowerCase() === "open";
      const negative = status.state.toLowerCase() === "close";

      return (
        <Table.Row key={status.id}>
          <Table.Cell>
            <a href={status.html_url} target="_blank"> #{ status.number } </a>
          </Table.Cell>
          <Table.Cell>
            { status.title }
          </Table.Cell>
          <Table.Cell>
            { new Date(status.created_at).toLocaleDateString() }
          </Table.Cell>
          <Table.Cell>
            { new Date(status.updated_at).toLocaleDateString() }
          </Table.Cell>
          <Table.Cell>
            { status.labels.map(label => (
                <span className={"table--label"} key={label.id} style={{ backgroundColor: "#"+label.color }}>
                { label.name }
              </span>
            ))}
          </Table.Cell>
          <Table.Cell positive={positive} negative={negative}>
            <Icon name="attention" />
            { status.state }
          </Table.Cell>
        </Table.Row>
      )})
    )
  }
}

export default StatusTable;
