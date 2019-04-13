import React from 'react';

const Card = (props) => {
    return (
        <div className={props.status}>
            <b>{props.title}</b> <br />
            {props.message} <br />
            <p className="author">{props.author}</p>
            <div className="links">
                <form action={`api/kanban/delete/${props.id}`} method='POST'><Button variant="contained" color="primary">Delete</Button></form>
            </div></div>
    );
};

export default Card;