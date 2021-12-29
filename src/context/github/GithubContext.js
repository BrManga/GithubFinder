import { createContext, useReducer} from "react";
import githubReducer from "./GithubReducer";
const GithubContext=createContext()

export const GithubProvider=({children})=>{ 
    const initialState={
        users:[],
        user:{},
        repos:[],
        loading:false
    }
    const [state, dispatch]= useReducer(githubReducer, initialState)

    //Searches for users
    const searchUsers=async(text)=>{
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
        //Gets user repos
        const getUserRepos=async(login)=>{
            const response=await fetch(`https://api.github.com/users/${login}/repos?sort=created&per_page=10`,{
                headers:{
                    Authorization:`token `
                }
            })
            if(response.status===404) window.location='/notfound'
            else{
    
                const data=await response.json()
                dispatch({
                    type:'GET_REPOS',
                    payload:data
                })
            }
        }
    // Sets loading to true
    const setLoading=()=>dispatch({type:'SET_LOADING'})
    // Clears all users that are searched before
    const clearUsers=()=>dispatch({type:'CLEAR_USERS'})
    return <GithubContext.Provider value={{users:state.users, user:state.user, repos:state.repos, loading:state.loading, searchUsers,clearUsers, getUser, getUserRepos}}>
        {children}
    </GithubContext.Provider>
}
export default GithubContext