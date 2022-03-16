import '../styles/globals.css'
import 'bootswatch/dist/cosmo/bootstrap.min.css'
import { createContext } from 'react'
import { useState } from 'react';

 export const UserContext = createContext(undefined);


function MyApp({ Component, pageProps }) {
  const [userLogged,setUserLogged] = useState(null);

  return <UserContext.Provider value={{userLogged,setUserLogged}}>
    <Component {...pageProps} />
  </UserContext.Provider>
  
}

export default MyApp
