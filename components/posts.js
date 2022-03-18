import { useEffect, useState,useContext} from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Link from "next/link";
import {UserContext} from '../pages/_app'
import StarBorderIcon from '@mui/icons-material/StarBorder';



export default function Posts()  {
    const [posts,setPosts] = useState([])
    const {userLogged,setUserLogged} = useContext(UserContext)
    
    useEffect(()=>  {
        const fetchData =  async() => {
            const {data} = await axios.get('http://localhost:3001/api/posts')
            const reserveData = data.reverse()
           setPosts(reserveData)  
        }
         fetchData()
    },[])

    

     const handleLikes =  async (post,e) => {
     
      try {
          const {data} = await axios.post(`http://localhost:3001/api/posts/like/${post.id}`,{userName : userLogged.userName})
           userLogged.likes = data
           window.localStorage.setItem(
            'userlogged',JSON.stringify(userLogged))
            if(e.target.style.color == 'yellow'){
              e.target.style.color = 'black' ;
            } else if(e.target.style.color == 'black'){
              e.target.style.color = 'yellow'
            }
        } catch (error) {
          console.error(error)
        }
        
      
    } 


    return posts.map((post,index) => {if(!userLogged) return (null);
    else if(userLogged.likes.includes(post.id)) return ( <Card sx={{ width: 345,margin:'30px' }} key={index}>
    <CardActionArea><Link href={`/singlePost/${post.id}`}>
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
      </CardContent> 
      </Link>
     <StarBorderIcon style={{color:'yellow'}} onClick={(e) =>  handleLikes(post,e)}/>
    </CardActionArea>
  </Card> ); else if (!userLogged.likes.includes(post.id)) return (<Card sx={{ width: 345,margin:'30px' }} key={index}>
    <CardActionArea><Link href={`/singlePost/${post.id}`}>
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
      </CardContent> 
       </Link>
       <StarBorderIcon  style={{color:'black'}} onClick={(e) =>  handleLikes(post,e)}/>
    </CardActionArea>
  
  </Card>);   }) 

}