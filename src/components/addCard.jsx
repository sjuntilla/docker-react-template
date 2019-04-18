import React, { Component } from 'react';
import { connect } from 'react-redux';
import addCard from '../actions';

class AddCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: '',
            message: '',
            author: '',
            status: ''
        }
    }
}