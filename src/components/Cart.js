import React, { useContext } from 'react'
import { Table, Typography } from 'antd'
import { StoreContext } from 'context/StoreContext'

const { Title, Text } = Typography

const Cart = () => {
  const { shoppingCart } = useContext(StoreContext)
  const columns = [
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
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
  ]

  const data = []

  shoppingCart.forEach((item) => {
    const isDuplicateItem = data.some((d) => d.key === item.id)
    if (!isDuplicateItem) {
      const filteredCart = shoppingCart.filter((s) => s.id === item.id)
      const itemPrice = (item.price - item.price * item.discount).toFixed(2)
      data.push({
        key: item.id,
        name: item.name,
        price: `$${itemPrice}`,
        quantity: filteredCart.length,
        totalPrice: `$${filteredCart.length * itemPrice}`,
      })
    }
  })

  return (
    <>
      <Title>Your Cart</Title>
      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default Cart
