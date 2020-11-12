import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Row, Col, Spin, Image, Space, Typography, Button, message } from 'antd'
import { useLocation, useParams } from 'react-router-dom'
import { ShoppingCartOutlined, StopOutlined } from '@ant-design/icons'
import { StoreContext } from 'context/StoreContext'

const { Text, Title } = Typography

const ProductPage = () => {
  const { product } = useLocation()
  const { addItemToShoppingCart } = useContext(StoreContext)
  const [prod, setProd] = useState(product)
  const params = useParams()

  useEffect(() => {
    if (!product) {
      axios.get(`/products/${params.id}.json`)
        .then((res) => {
          console.log(res)
          setProd(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [params, product])

  const addToCart = () => {
    addItemToShoppingCart(prod)
    message.success(`${prod.name} added to cart`)
  }

  if (prod) {
    console.log(prod)
    const hasDiscount = prod.discount > 0
    const inStock = prod.stock_quantity > 0
    const price = (() => {
      const p = parseFloat(prod.price).toFixed(2)
      if (hasDiscount) {
        return (
          <Space direction="vertical" className="">
            <div>
              <Text type="danger" delete>{`$${p}`}</Text>
              <Text type="danger" strong>{` $${(p - p * prod.discount).toFixed(2)}`}</Text>
            </div>
            <Text type="danger">{`Save ${prod.discount * 100}%`}</Text>
          </Space>
        )
      }
      return <div className="product-card-price"><Text strong>{`$${p}`}</Text></div>
    })()

    const stockText = inStock ? (
      <Text type="success">{`${prod.stock_quantity} in Stock!`}</Text>
    ) : (
      <Text type="danger">
        <StopOutlined />
        {' Out of Stock'}
      </Text>
    )

    const page = (
      <>
        <Row
          gutter={20}
          justify="center"
          style={{ width: '100%' }}
        >
          <Col>
            <Image src={prod.image} style={{ maxWidth: '400px' }} />
          </Col>
          <Col style={{ maxWidth: '600px', marginTop: '2em' }}>
            <Title level={2}>{prod.name}</Title>
            <Title level={5}>{price}</Title>
            <Title level={4}>Overview</Title>
            <Text type="secondary">{prod.description}</Text>
            <br />
            <Button
              style={{ margin: '2em 0 1em 0' }}
              onClick={addToCart}
              type="primary"
              icon={<ShoppingCartOutlined />}
              disabled={!inStock}
            >
              Add to Cart
            </Button>
            <br />
            {stockText}
          </Col>
        </Row>
      </>
    )
    return page
  }

  return <Row justify="center" align="middle"><Spin size="large" /></Row>
}

export default ProductPage
