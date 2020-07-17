import React from "react";
import { Modal } from 'antd';

import Form from "./formUpdate"

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            visible: this.props.visible,
        };
    }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  render() {
    const { visible } = this.state;
    return (
        <Modal
          visible={visible}
          title="Update"
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          okButtonProps={{ disabled: true }}
          cancelButtonProps={{ disabled: true }}
        >
            <Form handleCancel={this.props.handleCancel} recipeList={this.props.recipeList} id={this.props.id} />
        </Modal>
    );
  }
}
