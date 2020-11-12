import React, { useState, useEffect, useContext } from 'react'
import { Grid, Layout, Menu, Breadcrumb, Image, Badge } from 'antd'
import axios from 'axios'
import wideLogo from 'assets/img/logo-blue.png'
import { StoreContext } from 'context/StoreContext'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCartOutlined } from '@ant-design/icons'

const { useBreakpoint } = Grid
const { Header, Content, Footer } = Layout

const MyLayout = ({ children }) => {
  const { breadcrumbs, shoppingCart } = useContext(StoreContext)
  const [pages, setPages] = useState([])
  const location = useLocation()
  const [currentNav, setCurrentNav] = useState(location.pathname.split('/')[1])

  useEffect(() => {
    axios.get('/pages.json')
      .then((res) => {
        console.log(res)
        setPages(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const navItems = [
    // Add hardcoded links here
    <Menu.Item key="products">
      <Link to="/products">Products</Link>
    </Menu.Item>,
    pages.map((page) => (
      page && (
        <Menu.Item key={page.permalink}>
          <Link to={`/${page.permalink}`}>
            {page.title}
          </Link>
        </Menu.Item>
      )
    )),
    <Menu.Item key="cart">
      <Link to="/cart">
        <Badge
          count={shoppingCart.length}
          size="small"
          offset={[-8, 4]}
        >
          <ShoppingCartOutlined style={{ fontSize: '2em' }} />
        </Badge>
      </Link>
    </Menu.Item>,
  ]

  const handleMenuClick = (e) => setCurrentNav(e.key)

  const crumbs = breadcrumbs.map((bc) => <Breadcrumb.Item key={bc}>{bc}</Breadcrumb.Item>)

  const contentPadding = !useBreakpoint().xs ? '0 40px' : '0'

  return (
    <Layout className="layout">
      <Header className="header">
        <Menu
          onClick={handleMenuClick}
          selectedKeys={[currentNav]}
          mode="horizontal"
          className="nav-menu"
        >
          <Image src={wideLogo} className="logo" />
          {navItems}
        </Menu>
      </Header>
      <Content style={{ padding: contentPadding }} className="all-content">
        {crumbs.length > 0 && (
          <Breadcrumb style={{ margin: '16px 0' }}>
            {crumbs}
          </Breadcrumb>
        )}
        <div className="main-content">
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Game Pit ©2020</Footer>
    </Layout>
  )
}

export default MyLayout