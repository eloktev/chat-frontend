import { createContext,useState,useEffect} from "react";
import api from "../api";
import { ClientJS } from 'clientjs';

export const userContext = createContext({})  

const UserContextProvider = (props) =>{
    const [user,setUser] = useState({});
 

    useEffect(() => {
        const clientJs = new ClientJS();
        const fprint = clientJs.getFingerprint();
        const userAgent = clientJs.getUserAgent();
        const browser = clientJs.getBrowser();
        const OS = clientJs.getOS();
        const language = clientJs.getLanguage(); 
        api.post(`/users`, {
            fingerprint: String(fprint),
            user_agent: userAgent,
            browser: browser,
            os: OS,
            language: language
        })
            .then(response => {
                setUser(response.data);
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
        
      }, [])


    return(
        <userContext.Provider value={{user}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserContextProvider