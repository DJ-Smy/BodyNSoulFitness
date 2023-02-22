import React from "react";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";


function UserForm({ onFinish, initialValues }) {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initialValues,
      }}
    >
      <h1 className="card-title mt-3">Personal Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input your name!" },
            ]}
          >
            <Input placeholder="Name"></Input>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input placeholder="Email"></Input>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your Phone Number!" },
            ]}
          >
            <Input placeholder="Phone Number"></Input>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your Address!" }]}
          >
            <Input placeholder="Address"></Input>
          </Form.Item>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}

export default UserForm;
