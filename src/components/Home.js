import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { List, Typography } from 'antd'
import { Link } from 'react-router-dom'
import Loader from './UI/Loader'

const { Title, Text } = Typography

const Home = () => {
  const [categories, setCategories] = useState([{ link: '/products', name: 'All Products' }])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('/categories.json')
      .then((res) => {
        console.log(res)
        setCategories((prev) => prev.concat(res.data))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const categoryList = (
    <List
      dataSource={categories}
      renderItem={(item) => (
        <List.Item>
          <Link to={item.id ? `/products/category/${item.id}` : item.link}>{item.name}</Link>
        </List.Item>
      )}
    />
  )

  return (
    <div>
      <Title level={2}>Browse By Category</Title>
      {isLoading ? <Loader /> : categoryList}
    </div>
  )
}

export default Home
