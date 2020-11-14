import React, { useState, useEffect, createContext } from 'react'

export const StoreContext = createContext()

export default ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState(JSON.parse(localStorage.getItem('gamePitShoppingCart')) || [])
  const [breadcrumbs, setBreadcrumbs] = useState(['Home'])

  useEffect(() => {
    localStorage.setItem('gamePitShoppingCart', JSON.stringify(shoppingCart))
  }, [shoppingCart])

  const store = {
    shoppingCart,
    addItemToShoppingCart: (product) => setShoppingCart((prev) => [...prev, product]),
    breadcrumbs,
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
