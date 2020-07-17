import React from "react";
import { Form, Input, Button } from 'antd';

import { RecipeApi } from "../api";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default  function Demo({handleCancel, recipeList}) {
  const onFinish = async values => {
    console.log('Success:', values);
    const { data } = await RecipeApi.post(values);
    handleCancel();
    recipeList()
    console.log('data', data);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input subscription' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};