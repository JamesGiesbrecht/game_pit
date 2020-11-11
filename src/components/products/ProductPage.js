import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Spin, Image } from 'antd'
import { useLocation, useParams } from 'react-router-dom'

const ProductPage = () => {
  const { product } = useLocation()
  const [prod, setProd] = useState(product || {})
  const params = useParams()

  useEffect(() => {
    if (!product) {
      axios.get(`/products/${params.id}.json`)
        .then((res) => {
          console.log(res)
          setProd(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [params, product])

  const page = (
    <div>
      <Image src={prod.image} />
    </div>
  )
  const fullscreenSpinner = <Row justify="center" align="middle"><Spin size="large" /></Row>

  return prod ? page : fullscreenSpinner
}

export default ProductPage
