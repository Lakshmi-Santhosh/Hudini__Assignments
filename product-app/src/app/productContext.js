import { createContext, useReducer } from "react";

export const productContext = createContext([]);
export const productDispatchContext = createContext([]);

 const initialProductState ={
    products: [],
    searchWord: '',
    sortPrice: ''
}

function productReducer(fetchedProduct,action){
    switch (action.type){
       case 'SEARCH':
        return {...fetchedProduct,
               searchWord:action.value};
        case 'SORT':
          return {...fetchedProduct,
            sortPrice:action.value};
        case 'SET_PRODUCTS':
                return {
                    ...fetchedProduct,
                    products: action.value
                };
        default:
            return state;
      }
    }


export const ProductProvider = ({children})=>{
    const[state,dispatch] =useReducer(productReducer,initialProductState);
    return(
        <productContext.Provider value={state}>
            <productDispatchContext.Provider value={dispatch}>
                {children}
            </productDispatchContext.Provider>
        </productContext.Provider>
    )
}