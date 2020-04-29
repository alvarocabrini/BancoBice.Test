import React, { Component } from 'react';
import { DropdownList } from 'react-widgets'
import CanvasJSReact from '../assets/canvasjs.react.js';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class HistoricalInformation extends Component {
  static displayName = 'Información historica por elemento';

  constructor(props) {
    super(props);
    this.months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembte"]
    this.defaultDropDownListElementValue = 'Selecciona un elemento'

    this.state = {
      dropDownListElements: [],
      dropDownListElementValue: this.defaultDropDownListElementValue,
      graphData: [],
      graph: {},
      proyectionSince: null,
      loading: true
    };
  }

  componentDidMount() {
    this.populateElements();
  }

  updateDropDownElementsValue = (value) => {
    const newValue = value.key;
    this.setState({ dropDownListElementValue: newValue });
    this.populateGraph(newValue);
  }

  render() {
    let contentDropDownListElements = this.state.loading
      ? <p><em>Cargando...</em></p>
      :
      <DropdownList
        data={this.state.dropDownListElements}
        value={this.state.dropDownListElementValue}
        valueField='key'
        textField='value'
        onChange={this.updateDropDownElementsValue}
      />

    return (
      <div>
        <h2>Último año por elemento</h2>
        <div className="container">
          <div className="row mt-3"></div>
          <div className="row mt-3"></div>
          <div className="row">
            <div className="col">
              <p>Despliega la información del ultimo año de un elemento proyectando el valor de los meses restantes</p>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              {contentDropDownListElements}
            </div>
          </div>
          <div className="row mt-3"></div>
          <div className="row mt-3"></div>
          <div className="row">
            <div className="col">
              {
                this.state.dropDownListElementValue !== this.defaultDropDownListElementValue
                  ? <p><b>{this.state.proyectionSince}</b></p>
                  : null
              }
            </div>
          </div>
          <div className="row">
            <div className="col">
              {
                this.state.dropDownListElementValue !== this.defaultDropDownListElementValue
                  ? <CanvasJSChart options={this.state.graph} />
                  : null
              }
            </div>
          </div>
          <div className="row mt-3"></div>
          <div className="row mt-3"></div>
          <div className="row mt-3"></div>
          <div className="row mt-3"></div>
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

  async populateGraph(dropDownListElementValue) {
    const uri = 'elements/' + dropDownListElementValue;
    const response = await fetch(uri);
    const data = await response.json();
    let years = [];

    for (var i in data[0]) {
      years.push(data[0][i].year);
    }

    years = [...new Set(years)];

    const currentYear = data[1][0].lastDate.year;
    const proyectionText = '** Valor proyectado a partir de ' + this.months[data[1][0].lastDate.month].toLowerCase() + ' ' + currentYear + ' **';
    this.setState({ proyectionSince: proyectionText });
    const unit = data[2];
    const dataToLoad = data[0].slice(Math.max(data[0].length - 12, 1))
    const graphData = [];

    for (var i = 0; i < dataToLoad.length; i++) {
      graphData.push({ x: new Date(data[1][0].lastDate.year, dataToLoad[i].month - 1), y: parseFloat(dataToLoad[i].averageValue) });
    }

    const titleElement = dropDownListElementValue[0].toUpperCase() + dropDownListElementValue.slice(1)

    const graph = {
      animationEnabled: true,
      title: {
        text: titleElement + ' - ' + currentYear
      },
      axisX: {
        valueFormatString: "MMM"
      },
      axisY: {
        title: "Unidad en " + unit,
        prefix: "$",
        includeZero: false
      },
      data: [{
        yValueFormatString: "$#.###",
        xValueFormatString: "MMMM",
        type: "spline",
        dataPoints: graphData
      }]
    }

    this.setState({ graph });
  }
}