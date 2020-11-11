import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Row, Spin } from 'antd'
import Product from './Product'

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

  const prods = products.slice(0, 100).map((p) => (
    <Col
      key={p.id}
      xs={24}
      sm={12}
      md={8}
      lg={6}
      xxl={4}
    >
      <Product
        product={p}
      />
    </Col>
  ))

  return (
    <div>
      <Row gutter={[24, 24]}>
        {prods}
        {isLoading && <Spin />}
      </Row>
    </div>
  )
}

export default Products
