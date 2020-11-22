import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import Loader from 'components/UI/Loader'
import ProductsCollection from './ProductsCollection'

const FetchProducts = () => {
  const history = useHistory()
  const params = useParams()
  const [products, setProducts] = useState([])
  const [title, setTitle] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const categoryId = params.id
    let url
    if (params.id) {
      url = `/categories/${categoryId}.json`
    } else {
      url = '/products.json'
    }
    setIsLoading(true)
    axios.get(url)
      .then((res) => {
        console.log(res)
        const productJson = params.id ? res.data.products : res.data
        setTitle(res.data.name || 'All Products')
        setProducts(productJson)
      })
      .catch((err) => {
        console.log(err)
        if (url !== '/products.json' && history.location.pathname !== '/products') history.push('/products')
      })
      .finally(() => setIsLoading(false))
  }, [history, params])

  return isLoading ? <Loader /> : <ProductsCollection products={products} title={title} />
}

export default FetchProducts
