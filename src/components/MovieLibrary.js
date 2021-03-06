import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Movie from './Movie';
import Search from './Search';

import './MovieLibrary.css';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      moreMovies: '',
      movieCount: 0,
    };
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = () => {
    axios.get('http://localhost:3000/movies')
    .then((response) => {
      this.setState({
        movies: response.data,
        movieCount: response.data.length,
      });
      this.props.movieCountCallback(`Successfully loaded ${this.state.movieCount} movies`)
    })
    .catch((error) => {
      this.setState({ error: error.message });
    });
  }


  render() {
    const allMovies = this.state.movies.map((movie) => {
      return <Movie
        key={movie.id}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        release_date={movie.release_date}
        image_url={movie.image_url}
        external_id={movie.external_id}
        grabMovieTitleCallback={this.props.grabMovieTitleCallback}
        />

    });


    return (
      <div >
        <div className="library">
          {allMovies}
        </div>
      </div>
    )
  }
}

MovieLibrary.propTypes = {
  movieCountCallback:PropTypes.func,
  grabMovieTitleCallback:PropTypes.func,
};

export default MovieLibrary;
