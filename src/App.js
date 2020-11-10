import React from 'react'
import Layout from 'components/Layout'
import Products from 'components/products'
import { BrowserRouter, Route } from 'react-router-dom'
import 'App.css'
import 'Ant.css'

const App = () => (
  <BrowserRouter>
      <Layout>
        <Route path="/products" component={Products} />
      </Layout>
  </BrowserRouter>
)

export default App
