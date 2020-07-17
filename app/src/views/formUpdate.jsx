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

export default  function Demo({handleCancel, recipeList, id}) {
    console.log('id', id);
  const onFinish = async values => {
    console.log('Success:', values);
    const { status } = await RecipeApi.put({
        id: id.id,
        description: values.description
      });
      if (status == 200) {
        handleCancel();
        recipeList()
      }
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
        <Input defaultValue={id.description} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};