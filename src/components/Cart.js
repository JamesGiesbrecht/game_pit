import React from 'react'
import { Table, Typography } from 'antd'

const { Title, Text } = Typography

const Cart = () => {
  const columns = []
  const data = []

  return (
    <>
      <Title>Your Cart</Title>
      <Table columns={columns} data={data} />
    </>
  )
}

export default Cart
