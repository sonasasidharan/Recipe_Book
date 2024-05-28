import React, { createContext, useState } from 'react'

export const addRecipeResponseContext = createContext()
export const editRecipeResponseContext = createContext()

function Contextapi({children}) {
    const [addRecipeResponse,setRecipeResponse] = useState("")
    const [editRecipeResponse,setEditRecipeResponse] = useState("")
  return (
        <>

            <addRecipeResponseContext.Provider value={{addRecipeResponse,setRecipeResponse}}>
                <editRecipeResponseContext.Provider value={{editRecipeResponse,setEditRecipeResponse}}>
                    {children}
                </editRecipeResponseContext.Provider>
            </addRecipeResponseContext.Provider>
        </>
    )
}

export default Contextapi