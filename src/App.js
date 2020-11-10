import React from 'react'
import Layout from 'components/Layout'
import Products from 'components/products'
import { BrowserRouter, Route } from 'react-router-dom'
import 'App.css'
import 'Ant.css'
import StoreProvider from 'context/StoreContext'

const App = () => (
  <BrowserRouter>
    <StoreProvider>
      <Layout>
        <Route path="/products" component={Products} />
      </Layout>
    </StoreProvider>
  </BrowserRouter>
)

export default App
