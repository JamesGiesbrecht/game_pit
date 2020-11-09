import React, { useState, Children, cloneElement } from 'react'
import { Grid, Layout, Menu, Breadcrumb, Image } from 'antd'
import wideLogo from 'assets/img/logo_wide.png'

const { useBreakpoint } = Grid


const MyLayout = ({ children }) => {
  const { Header, Content, Footer } = Layout
  const [breadcrumbs, setBreadcrumbs] = useState(['Home'])
  const crumbs = breadcrumbs.map((bc) => <Breadcrumb.Item>{bc}</Breadcrumb.Item>)
  const childrenWithProps = Children.map(children, (child) => (
    cloneElement(child, { setBreadcrumbs })
  ))
  const contentPadding = !useBreakpoint().xs ? '0 40px' : '0'
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
