import React from 'react';
import SearchForm from './SearchForm';

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardList: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (!this.props.filterName) return
    this.props.filterName(e.target.value);
  }

  render() {
    let filterName = this.props.filterName;
    let filterForm = filterName ? <SearchForm filter={this.handleChange}/> : '';
    
    return  (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
        <div className="container">
          <a className="navbar-brand" href="/">Home</a>
          {filterForm}
        </div>
      </nav>
    )
  }
}

export default Header;
