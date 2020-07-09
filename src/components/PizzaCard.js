import React from 'react'
import {
    Menu,
    Layout,
    // Row, Col, Divider, 
    Badge, Drawer, Button,
    Space, Card, Avatar, Popover
} from 'antd';
import {
    SettingOutlined, MailOutlined, AppstoreOutlined,
    EditOutlined, EllipsisOutlined,
    ShoppingCartOutlined, RadiusBottomrightOutlined
} from '@ant-design/icons'
import pizza from '../assets/images/pizza-1317699_1920.jpg'

const { Meta } = Card;



const PizzaCard = props => {
    return (
        <Card
            style={{ width: 200, alignItems: 'center', alignContent: 'center' }}
            cover={
                <img
                    alt="example"
                    src={pizza}
                // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={[

                <ShoppingCartOutlined
                    key="cartIconCart"

                    // className="shopping-cart-icon"
                    fill="currentColor"
                // theme="outlined"
                // onClick={this.showDrawer}
                // onClick={this.props.onClick}
                />

                // <SettingOutlined key="setting" onClick={this.handleBadge} />,
                // <EditOutlined key="edit" />,
                // <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
                // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
            />
        </Card>
    )
}
export default PizzaCard