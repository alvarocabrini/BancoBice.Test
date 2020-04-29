import React, { Component } from 'react';
import Moment from 'react-moment';
import Table from 'react-bootstrap/Table'

export class LastElements extends Component {
  static displayName = 'Últimos elementos';

  constructor(props) {
    super(props);
    this.state = { lastElements: [], loading: true };
  }

  componentDidMount() {
    this.populateLastElements();
  }

  static renderLastElementsTable(lastElements) {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Elemento</th>
            <th>Descripción</th>
            <th>Valor</th>
            <th>Unidad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {lastElements.map(elements =>
            <tr key={elements.name}>
              <td>{elements.name}</td>
              <td>{elements.description}</td>
              <td>{elements.value}</td>
              <td>{elements.unit}</td>
              <td><Moment format="DD-MM-YYYY">
                {elements.dateTime}
              </Moment></td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Cargando...</em></p>
      : LastElements.renderLastElementsTable(this.state.lastElements);

    return (
      <div>
        <h2>Últimos elementos</h2>
        <div className="container">
          <div className="row mt-3"></div>
          <div className="row mt-3"></div>
          <div className="row">
            <div className="col">
              <p>A continuación se encuentra cada uno de los elementos con el ultimo valor actualizado</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {contents}
            </div>
          </div>
        </div>
      </div>
    );
  }

  async populateLastElements() {
    const response = await fetch('elements/last');
    const data = await response.json();
    this.setState({ lastElements: data, loading: false });
  }
}