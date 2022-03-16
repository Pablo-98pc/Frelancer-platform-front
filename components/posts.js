import { useEffect, useState,useContext} from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Link from "next/link";
import {UserContext} from '../pages/_app'
import { style } from "@mui/system";
import { red } from "@mui/material/colors";

export default function Posts()  {
    const [posts,setPosts] = useState([])
    const {userLogged,setUserLogged} = useContext(UserContext)
    const [userLikes,setUserLikes] = useState([])
    
    useEffect(()=> {
        const fetchData =  async() => {
            const {data} = await axios.get('http://localhost:3001/api/posts')
           setPosts(data)  
        }
        fetchData()

       
    },[])

    

     const handleLikes =  async (post) => {
        try {
          const {data} = await axios.post(`http://localhost:3001/api/posts/like/${post.id}`,{userName : userLogged.userName})
           userLogged.likes = userLogged.likes.concat(data)
           window.localStorage.setItem(
            'userlogged',JSON.stringify(userLogged))
        } catch (error) {
          console.error(error)
        }
      
    } 


    return posts.map((post,index) => <Card sx={{ width: 345,margin:'30px' }} key={index}>
    <Link href={`/singlePost/${post.id}`}><CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {post.subject}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {post.userCreator}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {post.likes}
        </Typography>
       <button  onClick={() =>  handleLikes(post)} >Like</button> 
      </CardContent>
    </CardActionArea>
    </Link>
  </Card>)

}