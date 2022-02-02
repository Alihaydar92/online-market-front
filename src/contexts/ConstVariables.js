import React, { createContext} from 'react'
export const ConstVariables = createContext()
const ConstVariablesProvider = (props) => {
    const page=0;
    const pageSize=15;
    return (
         <ConstVariables.Provider 
            value={{
                page,
                pageSize
             }}>
               {props.children}
         </ConstVariables.Provider>
    )
}
export default ConstVariablesProvider