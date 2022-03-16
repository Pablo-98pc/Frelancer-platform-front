import { useState,useContext, useEffect } from "react"
import {UserContext} from '../pages/_app'
import PostService from '../services/post'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

export default function CreatePosts() {
    const [price,setPrice] = useState()
    const [description,setDescription] = useState()
    const [subject,setSubject] = useState()
    const [likes,setLikes] = useState()
    const [userName, setUsername] = useState()
    const [tags,setTags] = useState([])
    const {userLogged,setUserLogged} = useContext(UserContext)
    const [open,setOpen] = useState(false)


    useEffect(()=> {
        console.log(userLogged)
        if(userLogged){
            setUsername(userLogged.userName)
        }
        

    },[userLogged])

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    

    const handlePost =async  (e) => {
        e.preventDefault()
        try {
            const post = await PostService.createPost({
                price,
                description,
                subject,
                likes,
                userName
            })
            setOpen(false)
            
        } catch (error) {
            console.error(error)
        }
    
    }

    return  <><Button variant="outlined" onClick={handleClickOpen}>
    Write a post
  </Button><Dialog open={open} onClose={handleClose}><DialogTitle>
      Create a Post
      </DialogTitle><Box component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '400px' ,display:'flex',flexDirection:'column'},
    }}
    noValidate
    autoComplete="off"
    onSubmit={handlePost}
  ><TextField
        id="demo-helper-text-aligned"
        label="Subject"
        onChange={((event) => setSubject(event.target.value))}
      />
      <TextField
  id="demo-helper-text-aligned"
  label="Description"
  onChange={((event) => setDescription(event.target.value))}
/>
      <TextField
        type="number"
        id="demo-helper-text-aligned"
        label="Price"
        onChange={((event) => setPrice(event.target.value))}
      />
        <button>
         <Button>Post</Button>
        </button>
    </Box>
    <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog> <style jsx>{`
            button{
                border:none;
                background:none
            }
        
        `}</style>
       </>
}