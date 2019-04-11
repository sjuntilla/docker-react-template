import React, {
  Component
} from 'react';
import './App.css';

class kanbanBoard extends Component {
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

  delete = id => {
    const headers = { "Content-Type": "application/json" };
    let data = { flag: id };
    fetch("/api/kanban/delete", {
      method: "POST",
      body: JSON.stringify(data),
      headers
    }).then(res => {
      return fetch("/")
        // .then(res => {
        //   return res.json();
        // })
        .then(body => {
          this.setState({ cards: body });
        });
    });
  };

  render() {
    const { cards } = this.state;
    return (
      <div>
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
          <input type="submit" label="Add Task" />
        </form >
        <div className="app">
          <div className="column"><h1>Queue</h1>{cards.filter(card => {
            if (card.status === 'queue') {
              return card;
            }
          }).map(card => (<Cards className={card.status} id={card.id.toString()} title={card.title} message={card.message} author={card.author} status={card.status} delete={this.delete} />))
          }</div>

          <div className="column"><h1>Pending</h1>{cards.filter(card => {
            if (card.status === 'pending') {
              return card;
            }
          }).map(card => (<Cards id={card.id.toString()} title={card.title} message={card.message} author={card.author} status={card.status} delete={this.delete} />))}</div>

          <div className="column"> <h1>Done</h1>{cards.filter(card => {
            if (card.status === 'done') {
              return card;
            }
          }).map(card => (<Cards id={card.id.toString()} title={card.title} message={card.message} author={card.author} status={card.status} delete={this.delete} />))}</div>
        </div>
      </div >)


  }
};
function Cards(props) {
  return (
    <div className={props.status}>
      <b>{props.title}</b> <br />
      {props.message} <br />
      <p className="author">{props.author}</p>
      <p className="links"><button>edit</button> &middot; <button onClick={() => { console.log('OH GOOOOOOOOOD', props.id); props.delete(props.id) }}>delete</button></p>
    </div >
  );
}

export default kanbanBoard;