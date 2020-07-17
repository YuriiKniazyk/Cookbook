import React from "react";
import { Modal, Table } from "antd";
const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
  },
];

export default class App1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: this.props.visible,
      data: this.props.recipeV,
    };
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  render() {
    const { visible,data } = this.state;
    return (
      <Modal
        visible={visible}
        title="Version"
        onOk={this.props.handleCancel}
        onCancel={this.props.handleCancel}
      >
        <Table columns={columns} dataSource={data} />
      </Modal>
    );
  }
}
