import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div className="container">
        <div className="row mt-3"></div>
        <div className="row mt-3"></div>
        <div className="row">
          <div className="col">
            <b>&Uacute;ltimos elementos:</b> despliega el &uacute;ltimo valor para cada uno de los elementos
          </div>
        </div>
        <div className="row">
          <div className="col">
            <b>Elementos por fecha:</b> despliega la informaci&oacute;n de un elemento seg&uacute;n la fecha seleccionada
          </div>
        </div>
        <div className="row">
          <div className="col">
            <b>&Uacute;ltimo a&ntilde;o por elemento:</b> despliega la informaci&oacute;n de un elemento en su &uacute;ltimo periodo, incluyendo una proyecci&oacute;n para los meses restantes
          </div>
        </div>
      </div>
    );
  }
}