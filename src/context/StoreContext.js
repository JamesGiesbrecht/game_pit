import React, { useState, createContext } from 'react'

export const StoreContext = createContext()

export default ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([])
  const [breadcrumbs, setBreadcrumbs] = useState(['Home'])

  const store = {
    shoppingCart,
    addItemToShoppingCart: (product) => setShoppingCart((prev) => [...prev, product]),
    breadcrumbs,
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
