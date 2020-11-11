import React, { useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const { Text, Title } = Typography

const Page = () => {
  const params = useParams()
  const [page, setPage] = useState({})

  useEffect(() => {
    axios.get(`/pages/${params.permalink}.json`)
      .then((res) => {
        console.log(res)
        setPage(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [params])

  return (
    <>
      <Title>{page.title}</Title>
      <Text>{page.content}</Text>
    </>
  )
}

export default Page
