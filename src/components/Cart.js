import React, { useContext } from 'react'
import { Image, Table, Typography } from 'antd'
import { StoreContext } from 'context/StoreContext'

const { Title, Text } = Typography

const Cart = () => {
  const { shoppingCart } = useContext(StoreContext)
  let total = 0

  const columns = [
    {
      dataIndex: 'img',
      title: '',
      key: 'img',
    },
    {
      dataIndex: 'name',
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ]

  const data = []

  shoppingCart.forEach((item) => {
    const isDuplicateItem = data.some((d) => d.key === item.id)
    if (!isDuplicateItem) {
      const filteredCart = shoppingCart.filter((s) => s.id === item.id)
      const itemPrice = (item.price - item.price * item.discount).toFixed(2)
      const itemTotalPrice = filteredCart.length * itemPrice
      total += itemTotalPrice
      data.push({
        key: item.id,
        img: <Image src={item.thumbnail} width={60} />,
        name: item.name,
        price: `$${itemPrice}`,
        quantity: filteredCart.length,
        total: `$${itemTotalPrice}`,
      })
    }
  })

  return (
    <>
      <Title>Your Cart</Title>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </>
  )
}

export default Cart
