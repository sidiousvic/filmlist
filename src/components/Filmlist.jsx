import React from 'react';
import App from '../index';

class Filmlist extends React.Component {
  createFilm(item) {
    return (
      <tr key="row" id={item.id}>
        <td>{item.title}</td>
        <td>{item.director}</td>
        <td>{item.year}</td>
        <th>❌</th>
      </tr>
    );
  }
  render() {
    const filmEntries = this.props.films;
    const listItems = filmEntries.map(this.createFilm);
    return (
      <tbody className="filmList" onClick={this.props.onClick}>
        {listItems}
      </tbody>
    );
  }
}
export default Filmlist;
