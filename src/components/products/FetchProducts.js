import React, { useState, useEffect, useContext } from 'react'
import { StoreContext } from 'context/StoreContext'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { CRUMBS } from 'utility/consts'
import Loader from 'components/UI/Loader'
import ProductsCollection from './ProductsCollection'

const FetchProducts = () => {
  const { setBreadcrumbs } = useContext(StoreContext)
  const history = useHistory()
  const params = useParams()
  const [products, setProducts] = useState([])
  const [title, setTitle] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setBreadcrumbs([CRUMBS.product])
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
        const categoryCrumb = res.data.name && { breadcrumbName: res.data.name, path: `category/${res.data.id}` }
        if (categoryCrumb) setBreadcrumbs([CRUMBS.product, categoryCrumb])
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
