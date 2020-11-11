import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from 'components/Layout'
import FetchProducts from 'components/products/FetchProducts'
import Page from 'components/Page'
import StoreProvider from 'context/StoreContext'
import 'App.css'
import 'Ant.css'

const App = () => (
  <BrowserRouter>
    <StoreProvider>
      <Layout>
        <Switch>
          <Route path="/products" component={FetchProducts} />
          <Route path="/:permalink" component={Page} />
        </Switch>
      </Layout>
    </StoreProvider>
  </BrowserRouter>
)

export default App
