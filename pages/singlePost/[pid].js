import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/router";


const SinglePost =  () =>{
    const router = useRouter()
    const {pid} = router.query
    const [post,setPost] = useState([])
   

    useEffect(()=> {
       if(pid != undefined){
           const fetchDataSinglePost = async () => {
            const {data} = await axios.get(`http://localhost:3001/api/posts/${pid}`)
            setPost(data)
        }
        fetchDataSinglePost()
       }
    },[pid])

    return <h1>Prueba {post.id}{post.subject}</h1>

}
export default SinglePost