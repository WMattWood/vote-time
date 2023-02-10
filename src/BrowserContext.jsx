import { createContext } from "react"

export const BrowserContext = createContext(null)
export const BrowserProvider = ( {children} ) => {

  // Set different brightness settings for SVG on different browsers
  let brightness = null
  
  if ( navigator.userAgent.indexOf("Firefox") > -1 ) {
    brightness = 200
  } else if ( navigator.userAgent.indexOf("Chrome") > -1 ) {
    brightness = 60
  } else if ( navigator.userAgent.indexOf("Safari") > -1 ) {
    brightness = 160
  }

  return (
    <BrowserContext.Provider value={{brightness}}>
      {children}
    </BrowserContext.Provider>
  )
}

export default BrowserProvider