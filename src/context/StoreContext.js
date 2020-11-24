import React, { useState, useEffect, createContext } from 'react'
import { CRUMBS } from 'utility/consts'

export const StoreContext = createContext()

export default ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState(JSON.parse(localStorage.getItem('gamePitShoppingCart')) || [])
  const [breadcrumbs, setBreadcrumbs] = useState([CRUMBS.home])

  useEffect(() => {
    console.log(shoppingCart)
    localStorage.setItem('gamePitShoppingCart', JSON.stringify(shoppingCart))
  }, [shoppingCart])

  const store = {
    shoppingCart,
    addItemToCart: (product) => setShoppingCart((prev) => [...prev, product]),
    removeItemFromCart: (id) => setShoppingCart((prev) => prev.filter((item) => item.id !== id)),
    removeFirstItemFromCart: (id) => setShoppingCart((prev) => {
      let matchFound = false
      // Not optimized but w/e
      // The double reverse() is so the items in the cart stay in the right order in the cart
      return prev.reverse().filter((item) => {
        if (matchFound || item.id !== id) {
          return true
        }
        matchFound = true
        return false
      }).reverse()
    }),
    breadcrumbs,
    setBreadcrumbs: (crumbs) => setBreadcrumbs([CRUMBS.home, ...crumbs]),
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
