import React from 'react';

class Location extends React.Component {
  render() {
    return  (
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{this.props.header}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><span className="fw-bold">Name:</span> {this.props.location.name}</li>
          <li className="list-group-item"><span className="fw-bold">Type:</span> {this.props.location.type}</li>
          <li className="list-group-item"><span className="fw-bold">Dimension:</span> {this.props.location.dimension}</li>
          <li className="list-group-item"><span className="fw-bold">Residents quantity:</span> {this.props.location.residents?.length}</li>
        </ul>
      </div>
    )
  }
}

export default Location;
