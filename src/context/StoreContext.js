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
    addItemToCart: (product) => setShoppingCart((prev) => [...prev, product]),
    removeItemFromCart: (id, removeAll = true) => setShoppingCart((prev) => {
      if (removeAll) {
        return prev.filter((item) => item.id === id)
      }
      return prev.splice(prev.findIndex((item) => item.id === id), 1)
    }),
    breadcrumbs,
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
