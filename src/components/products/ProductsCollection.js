import React, { useState } from 'react'
import { Col, Row, Pagination, Select, Checkbox, Input, Typography } from 'antd'
import ProductCard from './ProductCard'

const { Title } = Typography
const { Option } = Select
const { Search } = Input

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

const Products = ({ products, title }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [sort, setSort] = useState('default')
  const [showSale, setShowSale] = useState(false)
  const [search, setSearch] = useState('')
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage

  const filteredProducts = [...products].filter((p) => {
    const searchFilter = (() => {
      if (p.name.toLowerCase().includes(search)) return true
      return Object.keys(p.details).some((key) => {
        const value = (p.details[key] || '').toLowerCase()
        return value.includes(search)
      })
    })()
    return showSale ? p.discount > 0 && searchFilter : searchFilter
  })
  const sortedProducts = sorts[sort] ? [...filteredProducts].sort(sorts[sort]) : filteredProducts
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

  const onSaleChange = (e) => {
    setShowSale(e.target.checked)
    setCurrentPage(1)
  }

  const onSearch = (e) => {
    setSearch(e.target.value.toLowerCase())
    setCurrentPage(1)
  }

  const pagination = (
    <Pagination
      showSizeChanger
      onShowSizeChange={onPageChange}
      onChange={onPageChange}
      pageSize={itemsPerPage}
      current={currentPage}
      total={sortedProducts.length}
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
      <Title level={2}>{title}</Title>
      <Row justify="space-between">
        {pagination}
        {sortBy}
        <Search placeholder="input search text" onChange={onSearch} enterButton />
        <Checkbox onChange={onSaleChange}>Sale</Checkbox>
      </Row>
      <Row gutter={[24, 24]}>
        {currentProducts}
      </Row>
      {pagination}
    </div>
  )
}

export default Products
