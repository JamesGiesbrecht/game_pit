import React, { useState, Children, cloneElement } from 'react'
import { Grid, Layout, Menu, Breadcrumb, Image } from 'antd'
import wideLogo from 'assets/img/logo-blue.png'

const { useBreakpoint } = Grid
const { Header, Content, Footer } = Layout

const MyLayout = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState(['Home'])
  const [shoppingCart, setShoppingCart] = useState([])

  const crumbs = breadcrumbs.map((bc) => <Breadcrumb.Item key={bc}>{bc}</Breadcrumb.Item>)
  const contentPadding = !useBreakpoint().xs ? '0 40px' : '0'

  const addItemToShoppingCart = (product) => setShoppingCart((prev) => [...prev, product])

  const childrenWithProps = Children.map(children, (child) => (
    cloneElement(child, { setBreadcrumbs, addItemToShoppingCart, shoppingCart })
  ))

  return (
    <Layout className="layout">
      <Header className="header">
        <Menu mode="horizontal" className="nav-menu">
          <Image src={wideLogo} className="logo" />
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: contentPadding }} className="all-content">
        {crumbs.length > 0 && (
          <Breadcrumb style={{ margin: '16px 0' }}>
            {crumbs}
          </Breadcrumb>
        )}
        <div className="main-content">
          {childrenWithProps}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Game Pit ©2020</Footer>
    </Layout>
  )
}

export default MyLayout
