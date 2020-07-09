import React, { useState, useEffect } from "react";
// import { Link, Redirect } from 'react-router-dom'
import {
  Layout,
  Popconfirm,
  Badge,
  Card,
  Drawer,
  Button,
  Form,
  Input,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./styles.css";
import productService from "../../services/productService";
import pizza from "../../assets/images/pizza-1317699_1920.jpg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Header, Content } = Layout;

const { Meta } = Card;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ref = React.createRef();

export default function Home() {
  const notifyEmptyCart = () =>
    toast("Carrinho vazio! Adicione itens ao carrinho");
  const notifyAddItem = () => toast("Item adicionado ao carrinho!");

  const [products, setProducts] = useState([]);

  async function loadProducts() {
    const response = await productService.list();
    const data = await response.data;

    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const [badgeCount, setBadgeCount] = useState(0);
  const [list, setList] = useState([]);

  const addItem = (product) => {
    list.push(product);
    setList(list);
    setBadgeCount(badgeCount + 1);
    notifyAddItem();
  };

  const handleCart = () => {
    if (badgeCount === 0) {
      return notifyEmptyCart();
    }
    showDrawer();
  };

  const [visible, setVisible] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Layout>
        <Header className="header">
          <div className="menu-title">Delivery</div>
          <div className="menu-cart-icon">
            <Badge count={badgeCount}>
              <ShoppingCartOutlined
                key="menuCartIcon"
                style={{
                  fontSize: "24px",
                  color: "white",
                }}
                className="shopping-cart-icon"
                // onClick={showDrawer}
                onClick={handleCart}
              />
            </Badge>
            <ToastContainer />
          </div>
        </Header>
        <Content>
          <div className="products-list">
            {products.map((product) => (
              <Card
                className="product-card"
                key={product._id}
                style={{
                  width: 200,
                }}
                cover={<img alt="example" src={pizza} />}
                actions={[
                  <p key="cartItemPrice" style={{ cursor: "default" }}>
                    R$ {product.price}
                  </p>,
                  <Popconfirm
                    key="popConform"
                    title="Adicionar ao carrinho?"
                    onConfirm={() => addItem(product)}
                  >
                    <ShoppingCartOutlined
                      key="cartIconCart"
                      fill="currentColor"
                    />
                    ,
                  </Popconfirm>,
                ]}
              >
                <Meta title={product.name} description={product.description} />
              </Card>
            ))}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
      </Layout>
      <Drawer
        title="Multi-level drawer"
        width={520}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Button type="primary" ref={ref} onClick={showChildrenDrawer}>
          Two-level drawer
        </Button>
        <Drawer
          title="Two-level Drawer"
          width={320}
          closable={false}
          onClose={onChildrenDrawerClose}
          visible={childrenDrawer}
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </Drawer>
    </>
  );
}
