import React, { useContext, useState } from 'react'
import { Card, message, Space, Typography } from 'antd'
import { PlusOutlined, CheckOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons'
import { StoreContext } from 'context/StoreContext'
import { Link } from 'react-router-dom'

const { Meta } = Card
const { Text } = Typography

const Product = ({ product }) => {
  const { addItemToCart } = useContext(StoreContext)
  const [addToCartIcon, setAddToCartIcon] = useState()
  const hasDiscount = product.discount > 0
  const inStock = product.stock_quantity > 0

  const addToCart = () => {
    setAddToCartIcon(<CheckCircleOutlined style={{ color: 'green' }} />)
    addItemToCart(product)
    message.success(`${product.name} added to cart`, 1.5)
    setTimeout(() => {
      setAddToCartIcon(<PlusOutlined onClick={addToCart} />)
    }, 1500)
  }
  const description = (() => {
    const d = product.details
    const possibleDescriptions = ['capacity', 'colour', 'platform', 'publisher']
    const desc = []
    possibleDescriptions.forEach((pd) => { if (d[pd]) desc.push(<Text key={d[pd]}>{d[pd]}</Text>) })
    return <Text className="product-desc">{desc.length > 2 ? [desc[0], desc[1]] : desc}</Text>
  })()

  const price = (() => {
    const p = parseFloat(product.price).toFixed(2)
    if (hasDiscount) {
      return (
        <Space direction="vertical" className="">
          <div>
            <Text type="danger" delete>{`$${p}`}</Text>
            <Text type="danger" strong>{` $${(p - p * product.discount).toFixed(2)}`}</Text>
          </div>
          <Text type="danger">{`Save ${product.discount * 100}%`}</Text>
        </Space>
      )
    }
    return <div className="product-card-price"><Text strong>{`$${p}`}</Text></div>
  })()

  const addToCartInStock = (() => {
    if (inStock) {
      return (
        <div className="product-desc">
          {addToCartIcon || <PlusOutlined onClick={addToCart} />}
          <span style={{ color: 'green' }}>
            <CheckOutlined />
            {' In Stock'}
          </span>
        </div>
      )
    }
    return (
      <div className="product-desc">
        <span style={{ color: 'red' }}>
          <StopOutlined />
          {' Out of Stock'}
        </span>
      </div>
    )
  })()

  return (
    <Card
      className="product-card"
      cover={(
        <Link to={{
          pathname: `/products/${product.id}`,
          product,
        }}
        >
          <img
            alt={product.name}
            src={product.thumbnail}
          />
        </Link>
      )}
    >
      <Link to={{
        pathname: `/products/${product.id}`,
        product,
      }}
      >
        <Meta
          title={product.name}
          description={description}
        />
        {price}
      </Link>
      {addToCartInStock}
    </Card>
  )
}

export default Product
