import React from 'react'
import { Card, Typography } from 'antd'
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons'

const { Meta } = Card
const { Text } = Typography

const Product = ({ product }) => {
  const description = () => {
    const d = product.details
    const possibleDescriptions = ['capacity', 'colour', 'platform', 'publisher']
    const desc = []
    possibleDescriptions.forEach((pd) => { if (d[pd]) desc.push(<Text>{d[pd]}</Text>) })
    return <Text className="product-desc">{desc.length > 2 ? [desc[0], desc[1]] : desc}</Text>
  }
  return (
    <Card
      className="product-card"
      cover={(
        <img
          alt={product.name}
          src={product.image}
        />
      )}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        title={product.name}
        description={description()}
      />
      <Text>$39.99</Text>
    </Card>
  )
}

export default Product
