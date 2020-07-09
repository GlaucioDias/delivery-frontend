import React from "react";
// import { Link, Redirect } from 'react-router-dom'
import { Layout, Popconfirm, Badge, Card, Drawer, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./styles.css";
import productService from "../../services/productService";
import pizza from "../../assets/images/pizza-1317699_1920.jpg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Header, Footer, Content } = Layout;

const { Meta } = Card;

// const ref = React.createRef()

export default class Home extends React.Component {
  state = {
    products: [],
    list: [],
    newItem: "",
    badgeCount: 0,
    item: "",
    visible: false,
    childrenDrawer: false,
  };

  notify = () => toast("Produto adicionado");

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    try {
      const result = await productService.list();

      const products = result.data;
      this.setState({ products });
    } catch (error) {
      console.log(error);
    }
  };

  handleCart = () => {
    const { badgeCount, list } = this.state;

    if (badgeCount == 0) {
      return alert("Adicione itens ao carrinho");
    }
    console.log(badgeCount);
    this.props.history.push("/purchase", list);
  };

  addItem = (product) => {
    const newItem = product;
    const list = [...this.state.list];
    list.push(newItem);
    this.setState(
      {
        list,
        newItem: "",
        badgeCount: this.state.list.length + 1,
      },
      this.notify
    );
    console.log("list", list);
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  render() {
    const { products, badgeCount } = this.state;
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
                  onClick={this.showDrawer}
                  //   onClick={this.handleCart}
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
                      onConfirm={() => this.addItem(product)}
                    >
                      <ShoppingCartOutlined
                        key="cartIconCart"
                        fill="currentColor"
                      />
                      ,
                    </Popconfirm>,
                  ]}
                >
                  <Meta
                    title={product.name}
                    description={product.description}
                  />
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
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Button type="primary" onClick={this.showChildrenDrawer}>
            Two-level drawer
          </Button>
          <Drawer
            title="Two-level Drawer"
            width={320}
            closable={false}
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
          >
            This is two-level drawer
          </Drawer>
        </Drawer>
      </>
    );
  }
}
