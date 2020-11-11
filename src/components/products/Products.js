import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Spin } from 'antd'
import ProductsPage from './ProductsPage'

const Products = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    axios.get('/products.json')
      .then((res) => {
        console.log(res)
        setProducts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const fullscreenSpinner = <Row justify="center" align="middle"><Spin size="large" /></Row>

  return isLoading ? fullscreenSpinner : <ProductsPage products={products} />
}

export default Products
