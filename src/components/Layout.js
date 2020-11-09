import React from 'react'
import { Layout, Menu, Breadcrumb, Image } from 'antd'
import wideLogo from 'assets/img/logo_wide.png'

const MyLayout = ({ children, breadcrumbs = ['Home', 'Shop', 'Games'] }) => {
  const { Header, Content, Footer } = Layout
  const crumbs = breadcrumbs.map((bc) => <Breadcrumb.Item>{bc}</Breadcrumb.Item>)

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
      <Content style={{ padding: '0 50px' }}>
        {crumbs.length > 0 && (
          <Breadcrumb style={{ margin: '16px 0' }}>
            {crumbs}
          </Breadcrumb>
        )}
        <div className="site-layout-content">
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Game Pit ©2020</Footer>
    </Layout>
  )
}

export default MyLayout
