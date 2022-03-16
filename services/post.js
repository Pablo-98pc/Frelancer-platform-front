import axios from "axios";

const baseUrl = 'http://localhost:3001/api/posts'

const createPost = async credentials => {
    const {data} = await axios.post(baseUrl,credentials)
    return data
}
export default {createPost}