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
  Avatar,
} from "antd";
import {
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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

  useEffect(() => {
    async function loadProducts() {
      const response = await productService.list();
      const data = await response.data.filter((response) => response.available);

      setProducts(data);
    }

    loadProducts();
  }, []);

  const [badgeCount, setBadgeCount] = useState(0);
  const [badge, setBadge] = useState([]);

  const addItem = (product) => {
    setBadgeCount((prevCount) => prevCount + 1);
    setBadge([
      ...badge,
      {
        product,
      },
    ]);
    notifyAddItem();
  };

  // useEffect(() => {
  //   console.log("1", badge);
  // }, [badge]);

  const [drawerTitle, setDrawerTitle] = useState("");
  const handleCart = () => {
    if (badgeCount === 0) {
      return notifyEmptyCart();
      // setDrawerTitle("Seu carrinho está vazio");
    }

    showDrawer();
  };

  const [itemCount, setItemCount] = useState(1);
  const [itemTotalPrice, setItemTotalPrice] = useState("");

  const increase = () => {
    setItemCount((itemCount) => itemCount + 1);
    setItemTotalPrice((itemTotalPrice) => itemTotalPrice + itemTotalPrice);
  };

  const decline = () => {
    setItemCount((itemCount) => itemCount - 1);
  };

  useEffect(() => {
    // setItemTotalPrice();
    // (itemTotalPrice) =>
    console.log("1", itemTotalPrice);
  }, [itemCount]);

  const [visible, setVisible] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onCloseDrawer = () => {
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
    onChildrenDrawerClose();
    onCloseDrawer();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div ref={ref}>
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
                    // onConfirm={() => setList([product])}
                    onConfirm={() => {
                      addItem(product);
                    }}
                  >
                    <ShoppingCartOutlined
                      key="cartIconCart"
                      fill="currentColor"
                    />
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
        title={""}
        width={500}
        closable={false}
        onClose={onCloseDrawer}
        visible={visible}
      >
        {badge.map(({ product }) => (
          <Card
            style={{ width: 450, marginTop: 16 }}
            actions={[
              <p key="itemPrice" style={{ cursor: "default" }}>
                Total - R$ {itemTotalPrice ? itemTotalPrice : product.price}
              </p>,
              <Button.Group>
                <Button onClick={decline} icon={<MinusOutlined />} />
                <span style={{ fontSize: "24px", margin: "0 10px" }}>
                  {itemCount}
                </span>
                <Button
                  onClick={(() => setItemTotalPrice(product.price), increase)}
                  icon={<PlusOutlined />}
                />
              </Button.Group>,
            ]}
          >
            <Meta
              avatar={<Avatar shape="square" size={128} src={pizza} />}
              title={product.name}
              description={`R$ ${product.price}`}
            />
          </Card>
        ))}
        <Button
          type="primary"
          ref={ref}
          onClick={showChildrenDrawer}
          style={{ marginTop: 26 }}
        >
          Finalizar Pedido
        </Button>
        <Drawer
          title="Preencha os campos abaixo para finalizar o pedido"
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
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
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
                Finalizar
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </Drawer>
    </div>
  );
}
