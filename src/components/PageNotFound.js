import React from 'react';
import Header from './Header';

class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <h1>Page not found</h1>
        </div>
      </div>
    )      
  }
}

export default PageNotFound;
