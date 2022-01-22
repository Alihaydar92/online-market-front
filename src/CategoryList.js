import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CategoryList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.
  // }

  state = {
    categories: [
      { categoryId: 1, categoryName: "Haydar" },
      { categoryId: 2, categoryName: "Ali" },
      { categoryId: 3, categoryName: "Aluuu" },
    ]
  };

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <ListGroup>
          {this.state.categories.map((category) => (
            <ListGroupItem
              onClick={() => this.props.changeCategory(category)}
              key={category.categoryId}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        <h4>{this.props.currentCategory}</h4>
      </div>
    );
  }
}
