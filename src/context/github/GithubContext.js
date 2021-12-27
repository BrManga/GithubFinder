import { createContext, useReducer} from "react";
import githubReducer from "./GithubReducer";
const GithubContext=createContext()

export const GithubProvider=({children})=>{ 
    const initialState={
        users:[],
        loading:false
    }
    const [state, dispatch]= useReducer(githubReducer, initialState)


    const searchUsers=async(text)=>{
        console.log({text});
        setLoading()
        const response=await fetch(`https://api.github.com/search/users?q=${text}`)
        const {items}=await response.json()
        dispatch({
            type:'GET_USERS',
            payload:items
        })
    }
    const setLoading=()=>dispatch({type:'SET_LOADING'})
    const clearUsers=()=>dispatch({type:'CLEAR_USERS'})
    return <GithubContext.Provider value={{users:state.users, loading:state.loading, searchUsers,clearUsers}}>
        {children}
    </GithubContext.Provider>
}
export default GithubContext