import React, { Component } from 'react';
import Moment from 'react-moment';
import { DropdownList } from 'react-widgets'
import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Table from 'react-bootstrap/Table'
import "react-datepicker/dist/react-datepicker.css";
import 'react-widgets/dist/css/react-widgets.css';

export class ElementsByDate extends Component {
  static displayName = 'Elementos por fecha';

  constructor(props) {
    super(props);
    this.defaultDropDownListElementValue = 'Selecciona un elemento'

    this.state = {
      date: new Date(),
      elementsByDate: [],
      dropDownListElements: [],
      dropDownListElementValue: this.defaultDropDownListElementValue,
      searching: false,
      loading: true
    };
  }

  componentDidMount() {
    this.populateElements();
    this.populateElementsByDate();
  }

  static renderElementsByDateTable(elementsByDate) {
    return (
      <div>
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
            {elementsByDate.map(element =>
              <tr key={element.name}>
                <td>{element.name}</td>
                <td>{element.description}</td>
                <td>{element.value || '-'}</td>
                <td>{element.unit}</td>
                <td><Moment format="DD-MM-YYYY">
                  {element.dateTime}
                </Moment></td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }

  handleChange = date => {
    this.setState({
      date: date
    });
  };

  searchElement = () => {
    if (this.state.dropDownListElementValue !== this.defaultDropDownListElementValue) {
      this.populateElementsByDate();
      this.setState({ searching: true });
    }
  }

  updateDropDownValue = (value) => {
    const newValue = value.key;
    this.setState({ dropDownListElementValue: newValue });
  }

  render() {
    let contentsDropDownListElements = this.state.loading
      ? <p><em>Cargando...</em></p>
      :
      <DropdownList
        data={this.state.dropDownListElements}
        value={this.state.dropDownListElementValue}
        valueField='key'
        textField='value'
        onChange={this.updateDropDownValue}
      />

    let contentsCalendar =
      <DatePicker
        selected={this.state.date}
        dateFormat="dd-MM-yyyy"
        value={this.state.date}
        onChange={this.handleChange}
      />

    let contentsElementsByDateTable = this.state.searching && !this.state.loading
      ? ElementsByDate.renderElementsByDateTable(this.state.elementsByDate)
      : null;

    let searchButton = <Button
      variant="primary"
      onClick={this.searchElement}>
      Buscar
    </Button>

    return (
      <div>
        <h2>Elementos por fecha</h2>
        <div className="container">
          <div className="row mt-3"></div>
          <div className="row mt-3"></div>
          <div className="row">
            <div className="col">
              <p>Información de un elemento según la fecha seleccionada</p>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              {contentsDropDownListElements}
            </div>
            <div className="col-2">
              {contentsCalendar}
            </div>
            <div className="col-7">
              {searchButton}
            </div>
          </div>
          <div className="row mt-3"></div>
          <div className="row mt-3"></div>
          <div className="row">
            <div className="col">
              {contentsElementsByDateTable}
            </div>
          </div>
        </div>
      </div>
    );
  }

  async populateElements() {
    const responseElements = await fetch('elements');
    const dataElements = await responseElements.json();

    this.setState({
      dropDownListElements: dataElements,
      loading: false
    });
  }

  async populateElementsByDate() {
    this.setState({
      loading: true
    });

    if (this.state.dropDownListElementValue !== this.defaultDropDownListElementValue) {
      const date = this.state.date;
      const formatedDate =
        date.getFullYear() + "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("00" + date.getDate()).slice(-2);
      const element = this.state.dropDownListElementValue;
      const uri = 'elements/' + formatedDate + '/' + element;

      const responseElementsByDate = await fetch(uri);
      const dataElementsByDate = await responseElementsByDate.json();
      this.setState({
        elementsByDate: dataElementsByDate
      });
    }

    this.setState({
      loading: false
    });
  }
}