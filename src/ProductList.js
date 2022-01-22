import React, { Component } from 'react'

export default class ProductList extends Component {
    render() {
        return (
            <div>
                <h4>{this.props.title}-{this.props.currentCategory}</h4>
            </div>
        )
    }
}
