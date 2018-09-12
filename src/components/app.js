import React, { Component } from 'react';
import fetchIssues from '../services/fetchIssues';
import { Table, Icon, Loader } from 'semantic-ui-react';

class App extends Component {
  state = {
    issues: null,
    originalData: null,
  };

  componentDidMount() {
    fetchIssues().then((data) => {
      this.setState({ issues: data, originalData: data });
    });
  }

  render() {
    const { issues } = this.state;
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
        <Table columns={6} sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Issue Number
              </Table.HeaderCell>
              <Table.HeaderCell>
                Title
              </Table.HeaderCell>
              <Table.HeaderCell>
                Created At
              </Table.HeaderCell>
              <Table.HeaderCell>
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
