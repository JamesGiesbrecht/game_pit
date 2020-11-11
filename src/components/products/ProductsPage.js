import React, { useState } from 'react'
import { Col, Row, Pagination } from 'antd'
import Product from './Product'

const Products = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct).map((p) => (
    <Col
      key={p.id}
      xs={24}
      sm={12}
      md={8}
      lg={6}
      xxl={4}
    >
      <Product
        product={p}
      />
    </Col>
  ))

  const onShowSizeChange = (page, pageSize) => {
    console.log(`Show Size Change: ${page}, ${pageSize}`)
    setCurrentPage(page)
    setItemsPerPage(pageSize)
  }

  const onPageChange = (page, pageSize) => {
    console.log(`Page Change: ${page}, ${pageSize}`)
    setCurrentPage(page)
    setItemsPerPage(pageSize)
  }

  const pagination = (
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      onChange={onPageChange}
      pageSize={itemsPerPage}
      current={currentPage}
      total={products.length}
    />
  )

  return (
    <div>
      {pagination}
      <Row gutter={[24, 24]}>
        {currentProducts}
      </Row>
      {pagination}
    </div>
  )
}

export default Products
