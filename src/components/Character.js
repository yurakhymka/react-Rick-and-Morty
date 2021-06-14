import React from 'react';
import axios from 'axios';
import Location from './Location';
import PageNotFound from './PageNotFound';
import Header from './Header';

class Character extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      character: {},
      origin: {},
      location: {},
      episodeNameArray: [],
      notFound: false,
    }
  }

  componentDidMount() {
    let characterId = this.props.match.params.id;
    
    axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then(res => {
        this.setState({character: res.data});
        this.getCharacterLocationAndOrigin();
        this.getEpisodesName();
      })
      .catch(err => {
        console.log(err.response?.message);
        this.setState({notFound: true})
      }) 
  }

  getCharacterLocationAndOrigin() {
    let originUrl = this.state.character.origin.url;
    let locationUrl = this.state.character.location.url;
  
    this.getAdditionalData(originUrl, 'origin');
    this.getAdditionalData(locationUrl, 'location');
  }

  getAdditionalData(url, stateKey) {
    axios.get(`${url}`)
        .then(res => {
            this.setState({[stateKey]: res.data});
        })
        .catch(err => {
          console.log(err.response?.message);
        })  
  }

  getEpisodesName() {
    let episodeUrlArray = this.state.character.episode;
    let episodesArray = [];
    episodeUrlArray.forEach(async (item) => {
      let response = await axios.get(`${item}`);

      episodesArray.push(response.data);
      this.renderEpisodes(episodesArray);
    })
  }

  renderEpisodes(episodesArray) {
    let episodeNameArray = episodesArray.map((item) => this.getEpisodeTempate(item));
    
    this.setState({episodeNameArray: episodeNameArray});
  }

  getEpisodeTempate(episode) {
    return <span key={episode.id} >{episode.name + ', ' }</span>
  }

  getPageTemplate() {
    let character = this.state.character;
    let imageTemplate = character.image ? <img src={character.image} className="card-img-top" alt="character" /> : '';
    
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-3">
                {imageTemplate}
                <div className="card-body">
                    <h5 className="card-title">{character.name}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><span className="fw-bold">Species:</span> {character.species}</li>
                    <li className="list-group-item"><span className="fw-bold">Status:</span> {character.status}</li>
                    <li className="list-group-item"><span className="fw-bold">Gender:</span> {character.gender}</li>
                    <li className="list-group-item"><span className="fw-bold">Episodes:</span> {this.state.episodeNameArray}</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <Location header="Location" location={this.state.location} />
              <Location header="Origin" location={this.state.origin} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let notFound = this.state.notFound;

    return !notFound ? this.getPageTemplate() : <PageNotFound/>;
  }
}

export default Character;
