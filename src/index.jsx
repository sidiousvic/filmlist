import React from 'react';
import { render } from 'react-dom';
import Filmlist from './components/Filmlist';
import './index.scss';
import shortid from 'shortid';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      director: '',
      year: '',
      list: []
    };
  }

  componentDidMount() {
    const ls = JSON.parse(localStorage.getItem('films'));
    this.setState({ list: ls });
    console.log('mounted', ls);
  }

  componentDidUpdate() {
    const ls = JSON.parse(localStorage.getItem('films'));
    const list = this.state.list;
    localStorage.setItem('films', JSON.stringify(list));
  }

  onInput = e => {
    console.log(e.target.id);
    switch (e.target.id) {
      case 'title':
        this.setState({ title: e.target.value });
        break;
      case 'director':
        this.setState({ director: e.target.value });
        break;
      case 'year':
        this.setState({ year: e.target.value });
        break;
    }
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.title || !this.state.director || !this.state.year) {
      alert('Fill all fields!');
      return;
    }
    this.setState({
      list: [
        ...this.state.list,
        {
          title: this.state.title,
          director: this.state.director,
          year: this.state.year,
          id: shortid.generate()
        }
      ]
    });
  };

  onDelete = e => {
    const toBeDeletedId = e.target.parentNode.id;
    const newState = this.state.list.filter(item => item.id !== toBeDeletedId);
    this.setState({ list: newState });
  };

  render() {
    return (
      <div className="container">
        <h1>FILMLIST</h1>
        <form action="" id="book-form">
          <div>
            <label htmlFor="title">Title</label>
            <input
              onChange={this.onInput}
              type="text"
              id="title"
              className="u-full-width"
              placeholder="🎥"
            />
          </div>
          <div>
            <label htmlFor="title">Author</label>
            <input
              onChange={this.onInput}
              type="text"
              id="director"
              className="u-full-width"
              placeholder="🎬"
            />
          </div>
          <div>
            <label htmlFor="title">Year</label>
            <input
              onChange={this.onInput}
              type="text"
              id="year"
              className="u-full-width"
              placeholder="#"
            />
          </div>
          <div>
            <input
              onClick={this.onSubmit}
              type="submit"
              value="submit"
              className="u-full-width"
              id="submit"
            />
          </div>
        </form>
        <table className="u-full-width">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>🗑</th>
          </tr>
          <Filmlist
            key="filmList"
            films={this.state.list}
            onClick={this.onDelete}
          />
        </table>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
