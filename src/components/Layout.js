import React, { useState, useEffect, useContext } from 'react'
import { Grid, Layout, Menu, Breadcrumb, Image } from 'antd'
import axios from 'axios'
import wideLogo from 'assets/img/logo-blue.png'
import { StoreContext } from 'context/StoreContext'
import { Link } from 'react-router-dom'

const { useBreakpoint } = Grid
const { Header, Content, Footer } = Layout

const MyLayout = ({ children }) => {
  const { breadcrumbs } = useContext(StoreContext)
  const [pages, setPages] = useState([])
  const [navItems, setNavItems] = useState()

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

  useEffect(() => {
    const items = [
      // Add hardcoded links here
      <Menu.Item key="Products"><Link to="/products">Products</Link></Menu.Item>,
    ].concat(pages.map((page) => (
      <Menu.Item key={page.id}><Link to={`/${page.permalink}`}>{page.title}</Link></Menu.Item>
    )))
    setNavItems(items)
  }, [pages])

  const crumbs = breadcrumbs.map((bc) => <Breadcrumb.Item key={bc}>{bc}</Breadcrumb.Item>)

  const contentPadding = !useBreakpoint().xs ? '0 40px' : '0'

  return (
    <Layout className="layout">
      <Header className="header">
        <Menu mode="horizontal" className="nav-menu">
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
