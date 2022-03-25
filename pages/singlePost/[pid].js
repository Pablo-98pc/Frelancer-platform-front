/* import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import Header from "../../components/header";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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

    return <><Header/>
    <Card sx={{ width: 345,margin:'30px' }}>
        <CardActionArea>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {post.subject}
            </Typography>
            <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
</>

}
export default SinglePost */