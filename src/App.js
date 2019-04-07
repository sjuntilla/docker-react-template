import React, {
  Component
} from 'react';
import './App.css';

class kanbanBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smoke: 'test',
      cards: [],
      newCard: { title: '', author: '', message: '', status: '' },
      title: '',
      author: '',
      message: '',
      status: ''
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
    console.log(e.target.name)
    this.setState({ [e.target.name]: e.target.value })
  };

  newCard() {
    const card = this.state.newCard;
    const headers = { 'Content-Type': 'application/json' };
    fetch('/api/kanban', { method: 'POST', body: JSON.stringify(card), headers })
      .then((res) => {
        return fetch('/api/kanban')
          .then((res) => { return res.json(); })
          .then((body) => { this.setState({ cards: body }) })
      })
  }

  render() {
    const { cards } = this.state;
    return (
      <div>
        <h1>Add New Task</h1>
        <form>
          <input type="text" placeholder="title" name="title" value={this.state.newCard.title} onChange={this.updateCard} />
          <input type="text" placeholder="message" name="message" value={this.state.newCard.message} onChange={this.updateCard} />
          <input type="text" placeholder="author" name="author" value={this.state.newCard.author} onChange={this.updateCard} />
          <input type="text" placeholder="status" name="status" value={this.state.newCard.status} onChange={this.updateCard} />
          <button onClick={this.newCard}>Add Task</button>
        </form>
        <div className="app">
          <div className="column"><h1>Queue</h1>{cards.filter(card => {
            if (card.status === 'queue') {
              return card;
            }
          }).map(card => (<Cards className={card.status} key={card.id.toString()} title={card.title} message={card.message} author={card.author} status={card.status} />))
          }</div>

          <div className="column"><h1>Pending</h1>{cards.filter(card => {
            if (card.status === 'pending') {
              return card;
            }
          }).map(card => (<Cards key={card.id.toString()} title={card.title} message={card.message} author={card.author} status={card.status} />))}</div>

          <div className="column"> <h1>Done</h1>{cards.filter(card => {
            if (card.status === 'done') {
              return card;
            }
          }).map(card => (<Cards key={card.id.toString()} title={card.title} message={card.message} author={card.author} status={card.status} />))}</div>
        </div>
      </div>)


  }
};
function Cards(props) {
  return (
    <div className={props.status}>
      <b>{props.title}</b> <br />
      {props.message} <br />
      <p className="author">{props.author}</p>
      <p className="links"><a href="">edit</a> &middot; <a href="">delete</a></p>
    </div>
  );
}

export default kanbanBoard;