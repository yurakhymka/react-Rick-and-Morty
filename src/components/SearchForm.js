import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardList: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (!this.props.filter) return;
    this.props.filter(e);
  }

  render() {
    return (
      <form className="d-flex">
        <input className="form-control me-2" type="search" onBlur={this.handleChange} placeholder="Search" aria-label="Search" />
      </form>
    )      
  }
}

export default SearchForm;
