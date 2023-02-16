'use client'
import { createContext, useContext, useEffect, useState } from "react"

export const ClientDataContext = createContext<any>({
  clientData: {},
  setClientData: (): any => {}
})

export const ClientDataContextProvider = ({ children }) => {
  const [clientData, setClientData] = useState({})
  
  const gpu = () => {
    const canvas = document.createElement('canvas');
    let gl: any = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    let debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    let vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
    let renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)

    return vendor+':::'+renderer
  }

  useEffect(()=>{
    setClientData({
      _captcha: "false",
      _template: "table",
      timeOfVisit: (new Date).toString(),
      referrer: document.referrer,
      browser: JSON.stringify(require('detect-browser').detect()),
      userAgent: window.navigator.userAgent,
      screenDimensions: screen.width+'x'+screen.height,
      cores: navigator.hardwareConcurrency,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent).toString,
      gpu: gpu(),
      language: window.navigator.language,
      cookie: document.cookie,
    })
  }, [])

  return (
    <ClientDataContext.Provider value={{clientData, setClientData}}>
      {children}
    </ClientDataContext.Provider>
  )
}

export const useClientDataContext = () => useContext(ClientDataContext)
