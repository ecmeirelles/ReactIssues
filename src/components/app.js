import React, { Component } from 'react';
import fetchIssues from '../services/fetchIssues';
import { Table, Icon, Loader, Input, Dropdown } from 'semantic-ui-react';

class App extends Component {
  state = {
    issues: null,
    originalData: null,
    column: null,
    direction: null,
    searchText: '',
    searchCategory: 'title'
  };

  componentDidMount() {
    fetchIssues().then((data) => {
      this.setState({ issues: data, originalData: data });
    });
  }

  handleSort = clickedColumn => () => {
    const { column, issues, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        issues: clickedColumn === 'number'
            ? issues.sort((a, b) => a.number - b.number)
            : issues.sort((a, b) => new Date(a[clickedColumn]) - new Date(b[clickedColumn])),
        direction: "ascending"
      });
    } else {
      this.setState({
        issues: issues.reverse(),
        direction: direction === "ascending" ? "descending" : "ascending",
      });
    }
  };

  onSearch = (textValue, categoryValue) => {
    let { issues, originalData } = this.state;
    issues = originalData;
    if (textValue !== "") {
      switch(categoryValue) {
        case "title":
        case "state":
          issues = originalData.filter(data => data[categoryValue].toLowerCase().includes(textValue));
          break;
        case "number":
          issues = originalData.filter(data => data[categoryValue].toString().includes(textValue));
          break;
        case "labels":
          issues = originalData.filter(data => (
              data.labels.some(label => (
                  label.name.toLowerCase().includes(textValue))
              )
          ));
          break;
        default:
          break;
      }
    }
    this.setState({ issues });
  };

  render() {
    const { issues, column, direction, searchText, searchCategory } = this.state;
    if (issues === null) {
      return (
        <div style={{ marginTop: 30, textAlign: 'center' }}>
          <Loader active inline='centered' />
          <p style={{ marginTop: 8 }}>Loading</p>
        </div>
      )
    }
    return (
      <div style={{ margin: 30 }}>
        <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
          React Issues
        </h1>
        <div style={{ textAlign: "right" }}>
          <Input
            action={<Dropdown button basic floating options={[
              { key: "number", text: "Number", value: "number" },
              { key: "title", text: "Title", value: "title" },
              { key: "labels", text: "Label", value: "labels" },
              { key: "state", text: "State", value: "state" },
            ]} defaultValue={searchCategory} onChange={(event, data) => {
              this.setState({ searchCategory: data.value });
              this.onSearch(searchText, data.value);
            }} />}
            icon="search"
            iconPosition="left"
            placeholder="Search..."
            onChange={(event, data) => {
              this.setState({ searchText: data.value });
              this.onSearch(data.value, searchCategory);
            }}
          />
        </div>
        <Table columns={6} sortable celled fixed>
          <Table.Header>
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
          </Table.Header>

          <Table.Body>
            { issues.map(issue => {
              const positive = issue.state.toLowerCase() === 'open';
              const negative = issue.state.toLowerCase() === 'close';
              return (
                <Table.Row key={issue.id}>
                  <Table.Cell>
                    <a href={issue.html_url} target='_blank'> #{ issue.number } </a>
                  </Table.Cell>
                  <Table.Cell>
                    { issue.title }
                  </Table.Cell>
                  <Table.Cell>
                    { new Date(issue.created_at).toLocaleDateString() }
                  </Table.Cell>
                  <Table.Cell>
                    { new Date(issue.updated_at).toLocaleDateString() }
                  </Table.Cell>
                  <Table.Cell>
                    { issue.labels.map(label => (
                        <span key={label.id} style={{
                          padding: 5,
                          margin: 2,
                          backgroundColor: '#'+label.color,
                          borderRadius: 2,
                          fontWeight: 'bold',
                          display: 'inline-block'
                        }}>
                  { label.name }
                </span>
                    ))}
                  </Table.Cell>
                  <Table.Cell positive={positive} negative={negative}>
                    <Icon name='attention' />
                    { issue.state }
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default App;
