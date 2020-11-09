import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Row, Grid, Spin } from 'antd'
import Product from './Product'

const { useBreakpoint } = Grid

const Products = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  console.log(useBreakpoint())
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

  const prods = products.slice(0, 30).map((p) => <Col span={6}><Product product={p} /></Col>)

  return (
    <div>
      <Row gutter={[8, 8]}>
        {prods}
        {isLoading && <Spin />}
      </Row>
    </div>
  )
}

export default Products
