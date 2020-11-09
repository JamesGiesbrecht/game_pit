import React from 'react'
import { Button } from 'antd'
import Layout from 'components/Layout'
import 'App.css'

function App() {
  return (
    <Layout>
      <Button
        type="primary"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </Button>
    </Layout>
  )
}

export default App
