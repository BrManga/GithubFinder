import axios from 'axios'
const github=axios.create({
    baseURL:'https://api.github.com/',
    headers: {
        Authorization:`token ${process.env.GITHUB_AUTHANTICATE}`
    }
})
//Searches for users
export const searchUsers = async (text) => {
    const response= await github.get(`/search/users?q=${text}`)
    return response.data.items
}

// Get user and repos
export const getUserAndRepos=async(login)=>{
    const [user, repos]=await Promise.all([github.get(`/users/${login}`), github.get(`/users/${login}/repos?sort=created&per_page=10`)])
    return {user : user.data, repos:repos.data}
}
