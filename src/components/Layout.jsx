import logo from "../images/tipxmr-live.png";
import { Layout, Menu, Image } from 'antd';
import { tiplayout } from "../styles/tiplayout"

// const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

function TipLayout() {
    return (
        <Layout>
            <Header>
                {/* <Title level={3}>TipXMR</Title> */}
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>

                    <img src={logo} width={180} />
                    <Menu.Item key="1">Streams</Menu.Item>
                    <Menu.Item key="2">Donate</Menu.Item>
                    <Menu.Item key="3">Login/Signup</Menu.Item>
                </Menu>
            </Header>
            <Content>This is some awesome Content</Content>
            <Footer>This is a footer</Footer>
        </Layout >
    )
}

export default TipLayout
