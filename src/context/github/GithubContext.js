import { createContext, useReducer} from "react";
import githubReducer from "./GithubReducer";
const GithubContext=createContext()

export const GithubProvider=({children})=>{ 
    const initialState={
        users:[],
        user:{},
        loading:false
    }
    const [state, dispatch]= useReducer(githubReducer, initialState)

    //Searches for users
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
    //Gets single user
    const getUser=async(login)=>{
        setLoading()
        const response=await fetch(`https://api.github.com/users/${login}`,{
            headers:{
                Authorization:`token `
            }
        })
        if(response.status===404) window.location='/notfound'
        else{

            const data=await response.json()
            dispatch({
                type:'GET_USER',
                payload:data
            })
        }
    }
    // Sets loading to true
    const setLoading=()=>dispatch({type:'SET_LOADING'})
    // Clears all users that are searched before
    const clearUsers=()=>dispatch({type:'CLEAR_USERS'})
    return <GithubContext.Provider value={{users:state.users, user:state.user, loading:state.loading, searchUsers,clearUsers, getUser}}>
        {children}
    </GithubContext.Provider>
}
export default GithubContext