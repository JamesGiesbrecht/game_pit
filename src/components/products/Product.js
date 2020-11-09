import React from 'react'
import { Card, Space, Typography } from 'antd'
import { PlusOutlined, CheckOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons'

const { Meta } = Card
const { Text } = Typography

const Product = ({ product }) => {
  const hasDiscount = product.discount > 0

  const description = (() => {
    const d = product.details
    const possibleDescriptions = ['capacity', 'colour', 'platform', 'publisher']
    const desc = []
    possibleDescriptions.forEach((pd) => { if (d[pd]) desc.push(<Text>{d[pd]}</Text>) })
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

  const inStock = product.stock_quantity > 0 ? (
    <span key="inStock" style={{ color: 'green' }}>
      <CheckOutlined />
      {' In Stock'}
    </span>
  ) : (
    <span key="inStock" style={{ color: 'red' }}>
      <StopOutlined />
      {' Out of Stock'}
    </span>
  )

  return (
    <Card
      className="product-card"
      cover={(
        <img
          alt={product.name}
          src={product.image}
        />
      )}
    >
      <Meta
        title={product.name}
        description={description}
      />
      {price}
      <div className="product-desc">
        <PlusOutlined key="addToCart" />
        {inStock}
      </div>
    </Card>
  )
}

export default Product
