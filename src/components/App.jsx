/* eslint class-methods-use-this: 0*/
/* eslint react/forbid-prop-types: 0 */
/* eslint arrow-body-style: 0 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { itemsFetchData } from './../redux/actions';
import './../App.css';
import List from './List';
import Note from './Note';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notes: [], current: null };
    this.newNote = this.newNote.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.newNoteView = this.newNoteView.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentWillMount() {
    this.getNotes();
  }

  // getNotes(currentNote) {
  getNotes() {
    this.props.fetchData('http://localhost:3001/notes');
    // .then((data) => {
    //   this.setState({ notes: data.data, current: currentNote });
    // });
  }

  newNote(input) {
    axios.post('http://localhost:3001/notes', {
      data: input.note,
      title: input.title,
    })
    .then((response) => {
      this.getNotes(response.data);
    });
  }

  updateNote(input) {
    axios.put(`http://localhost:3001/notes/${input.id}`, {
      data: input.note,
      title: input.title,
    })
    .then((response) => {
      this.getNotes(response.data);
    });
  }

  selectNote(id) {
    const curr = this.findNote(this.state.notes, id)[0];
    this.setState({ current: curr });
  }

  findNote(notes, id) {
    return notes.filter(note => note.id === id);
  }

  newNoteView() {
    this.setState({ current: null });
  }

  deleteNote(id) {
    axios.delete(`http://localhost:3001/notes/${id}`)
    .then(() => {
      this.getNotes(null);
    });
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }
    return (
      <div>
        <List deleteNote={this.deleteNote} selectNote={this.selectNote} notes={this.props.items} />
        <Note
          updateNote={this.updateNote}
          newNoteView={this.newNoteView}
          note={this.state.current}
          newNote={this.newNote}
          deleteNote={this.deleteNote}
        />
      </div>
    );
  }
}

App.propTypes = {
  fetchData: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: url => dispatch(itemsFetchData(url)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);

