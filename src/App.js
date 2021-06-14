import './App.css';
import React from 'react';
import axios from 'axios';
import Header from './components/Header'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardList: [],
      limitSize: 12
    }
    this.searchFieldChange = this.searchFieldChange.bind(this);
  }

  componentDidMount() {
    this.getCards();
  }

  cardTemplate(item) {
    return ( 
      <div key={item.id} className="col-lg-4 col-md-6 mb-3">
        <div className="card">
          <img src={item.image} className="card-img-top" alt="logo" />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <a href={"/character/" +  item.id} className="btn btn-primary">Details</a>
          </div>
        </div>
      </div>
    )   
  }

  searchFieldChange(value) {
    let searchName = value.trim();
    this.getCards(searchName);
  }

  getCards(query) {
    let url = new URL('https://rickandmortyapi.com/api/character');

    if (query) url.searchParams.append("name", query);
    axios.get(url)
      .then(res => {
        let cards = res.data.results;
        let filteredCards = cards.slice(0, this.state.limitSize);
        
        this.renderCards(filteredCards);
      })
      .catch(error => {
        console.log(error.response?.message)
        this.setState({cardList: []});
      });
  }

  renderCards(cards) {
    let renderCardList = cards.map((card) => this.cardTemplate(card));

    this.setState({cardList: renderCardList});
  }

  render() {
    let cardsQuantity = this.state.cardList.length;
    let template = cardsQuantity ? this.state.cardList : 'Cards not found';

    return  (
      <div className="App">
        <Header filterName={this.searchFieldChange} />
        <div className="container">
          <div className="row">{template}</div>
        </div>
      </div>
    )
  }
}

export default App;
