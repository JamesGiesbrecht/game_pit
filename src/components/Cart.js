import React, { useContext } from 'react'
import { Col, Image, Row, Space, Table, Typography } from 'antd'
import { StoreContext } from 'context/StoreContext'
import { toCurrency } from 'utility/util'

const { Title, Text } = Typography

// TODO: Get tax rates from db/user
const gst = 0.05
const pst = 0.07

const Cart = () => {
  const { shoppingCart } = useContext(StoreContext)
  let subTotal = 0
  let discountTotal = 0

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
      subTotal += item.price * filteredCart.length
      discountTotal += item.price * item.discount * filteredCart.length
      data.push({
        key: item.id,
        img: <Image src={item.thumbnail} width={60} />,
        name: item.name,
        price: toCurrency(itemPrice),
        quantity: filteredCart.length,
        total: toCurrency(itemTotalPrice),
      })
    }
  })

  const gstTotal = (subTotal - discountTotal) * gst
  const pstTotal = (subTotal - discountTotal) * pst

  return (
    <>
      <Title>Your Cart</Title>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <Space style={{ float: 'right', marginRight: '2em' }} direction="vertical" size="middle">
        <Row>
          <Col span={12}>
            <Text strong>Subtotal:</Text>
          </Col>
          <Col span={12}>
            <Text>{toCurrency(subTotal)}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Text strong>Discount:</Text>
          </Col>
          <Col span={12}>
            <Text style={{ color: 'red' }}>{`-${toCurrency(discountTotal)}`}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Text strong>GST:</Text>
          </Col>
          <Col span={12}>
            <Text>{toCurrency(gstTotal)}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Text strong>PST:</Text>
          </Col>
          <Col span={12}>
            <Text>{toCurrency(pstTotal)}</Text>
          </Col>
        </Row>
        <Row wrap={false} style={{ width: '300px' }}>
          <Col span={12}>
            <Title level={5}>Grand Total:</Title>
          </Col>
          <Col span={24}>
            <Title level={5}>{toCurrency(subTotal - discountTotal + gstTotal + pstTotal)}</Title>
          </Col>
        </Row>
      </Space>
    </>
  )
}

export default Cart
