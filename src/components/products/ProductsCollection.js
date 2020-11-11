import React, { useState } from 'react'
import { Col, Row, Pagination, Select } from 'antd'
import ProductCard from './ProductCard'

const { Option } = Select

const sorts = (() => {
  const priceAsc = (a, b) => {
    const price1 = a.price - a.price * a.discount
    const price2 = b.price - b.price * b.discount
    if (price1 < price2) return -1
    if (price1 > price2) return 1
    return 0
  }
  const priceDesc = (a, b) => priceAsc(b, a)
  const nameAsc = (a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0;
  }
  const nameDesc = (a, b) => nameAsc(b, a)
  const newest = (a, b) => {
    const date1 = new Date(a.created_at)
    const date2 = new Date(b.created_at)
    if (date1 > date2) return -1
    if (date1 < date2) return 1
    return 0
  }

  return {
    priceAsc,
    priceDesc,
    nameAsc,
    nameDesc,
    newest,
  }
})()

const Products = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [sort, setSort] = useState('default')
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage

  const sortedProducts = sorts[sort] ? [...products].sort(sorts[sort]) : products
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct).map((p) => (
    <Col
      key={p.id}
      xs={24}
      sm={12}
      md={8}
      lg={6}
      xxl={4}
    >
      <ProductCard
        product={p}
      />
    </Col>
  ))

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page)
    setItemsPerPage(pageSize)
  }

  const onSortChange = (value) => {
    setSort(value)
    setCurrentPage(1)
  }

  const pagination = (
    <Pagination
      showSizeChanger
      onShowSizeChange={onPageChange}
      onChange={onPageChange}
      pageSize={itemsPerPage}
      current={currentPage}
      total={products.length}
    />
  )

  const sortBy = (
    <Select defaultValue="default" style={{ width: 200 }} onChange={onSortChange}>
      <Option value="default">Default</Option>
      <Option value="nameAsc">Name: A-Z</Option>
      <Option value="nameDesc">Name: Z-A</Option>
      <Option value="priceAsc">Cheapest</Option>
      <Option value="priceDesc">Most Expensive</Option>
      <Option value="newest">Newest</Option>
    </Select>
  )

  return (
    <div>
      <Row justify="space-between">
        {pagination}
        {sortBy}
      </Row>
      <Row gutter={[24, 24]}>
        {currentProducts}
      </Row>
      {pagination}
    </div>
  )
}

export default Products
