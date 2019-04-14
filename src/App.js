import React, {
  Component
} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
// import navBar from './components/navbar.jsx'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { getCards } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      cards: [],
      title: '',
      message: '',
      author: '',
      status: '',
      delete: ''
    };

    this.getCards = this.getCards.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.newCard = this.newCard.bind(this);

    this.getCards();
  }

  componentDidMount() {
    console.log('this.props:', this.props);
    this.props.dispatch(getCards())
  }

  getCards() {
    fetch('/api/kanban').then((res) => { return res.json(); })
      .then((body) => { this.setState({ cards: body }); });
  };

  updateCard(e) {
    this.setState({ [e.target.name]: e.target.value })
  };

  newCard() {
    const card = {
      title: this.state.title,
      message: this.state.message,
      author: this.state.author,
      status: this.state.status
    }
    const headers = { 'Content-Type': 'application/json' };
    fetch('/api/kanban', { method: 'POST', body: JSON.stringify(card), headers })
      .then((res) => {
        return fetch('/api/kanban')
          .then((res) => { return res.json(); })
          .then((body) => { this.setState({ cards: body }) })
      })
  };

  render() {
    const { cards } = this.state;
    return (
      <Router>
        <div className="App">
          <h1>Add New Task</h1>
          <form id="form" onSubmit={this.newCard}>
            <input type="text" placeholder="title" name="title" value={this.state.title} onChange={this.updateCard} />
            <input type="text" placeholder="message" name="message" value={this.state.message} onChange={this.updateCard} />
            <input type="text" placeholder="author" name="author" value={this.state.author} onChange={this.updateCard} />

            <select name="status" className="status" onChange={this.updateCard}>
              <option value="null">Status...</option>
              <option value="queue">Queue</option>
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>
            <input type="submit" label="Add Task" variant="contained" color="primary" />
          </form >
          <div className="app">
            <div className="column"><h1>Queue</h1>{cards.filter(card => {
              if (card.status === 'queue') {
                return card;
              }
            }).map(card => (<Cards className={card.status} key={card.id} id={card.id.toString()} title={card.title} message={card.message} author={card.author} status={card.status} />))
            }</div>

            <div className="column"><h1>Pending</h1>{cards.filter(card => {
              if (card.status === 'pending') {
                return card;
              }
            }).map(card => (<Cards key={card.id} id={card.id.toString()} title={card.title} message={card.message} author={card.author} status={card.status} />))}</div>

            <div className="column"> <h1>Done</h1>{cards.filter(card => {
              if (card.status === 'done') {
                return card;
              }
            }).map(card => (<Cards key={card.id} id={card.id.toString()} title={card.title} message={card.message} author={card.author} status={card.status} />))}</div>
          </div>
        </div >
      </Router>
    )
  }
}

function Cards(props) {
  return (

    <div className={props.status}>
      <b>{props.title}</b> <br />
      {props.message} <br />
      <p className="author">{props.author}</p>
      <div className="links">

        <form action={`api/kanban/delete/${props.id}`} method='POST'><Button>Delete</Button></form>
      </div></div>

  );
}

export default connect()(App);