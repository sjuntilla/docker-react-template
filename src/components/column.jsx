import Kanbancard from './card.jsx';
import '../App.css';
import React from 'react';
import { connect } from 'react-redux';

export const Column = (props) => {
    console.log(props)
    return (
        <div>
            <div status={props.status} className="column">
                <Kanbancard
                    key={props.id}
                    status={props.status}
                    message={props.message}
                    author={props.author}
                />
            </div>
            {/* <div className="column"><h1>Queue</h1>{cards.filter(card => {
                if (card.status === 'queue') {
                    return card;
                }
            }).map(card => (<Card className={card.status} key={card.id} id={card.id.toString()} title={card.title} message={card.message} author={card.author} status={card.status} />))
            }</div>

            <div className="column"><h1>Pending</h1>{cards.filter(card => {
                if (card.status === 'pending') {
                    return card;
                }
            }).map(card => (<Card key={card.id} id={card.id.toString()} title={card.title} message={card.message} author={card.author} status={card.status} />))}</div>

            <div className="column"> <h1>Done</h1>{cards.filter(card => {
                if (card.status === 'done') {
                    return card;
                }
            }).map(card => (<Card key={card.id} id={card.id.toString()} title={card.title} message={card.message} author={card.author} status={card.status} />))}
            </div> */}
        </div>
    )
};

export default connect()(Column);