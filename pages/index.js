import {UserContext} from './_app'
import Image from 'next/image'
import { useEffect, useState,useRef,useCallback } from 'react'
import loginService from '../services/login'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import SignUpService from '../services/sign-up'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';


export default function LogIn() {
  const [password,setPassword] = useState(null);
  const [userName, setUsername] = useState(null);
  const {userLogged,setUserLogged} = useContext(UserContext)
  const [name,setName] = useState(null)
  const [handleLog,setHandleLog] = useState(true)
  const router = useRouter();

  useEffect(()=> {
    if(userLogged){
      router.push('/home')
     
    }
  },[userLogged])

  useEffect(()=> {
    const loggedUserJSON = window.localStorage.getItem('userlogged');
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUserLogged(user)
    }
  },[])

  
const handleLogin =async (event) => {
  event.preventDefault() 
  try {
    const user = await loginService.login({
    userName,
    password
  })
  setUserLogged(user)
  window.localStorage.setItem(
    'userlogged',JSON.stringify(user))
  } catch (error) {
    console.error(error.messsage)
  }
  
}
const handleLogStatus = () => {
  setHandleLog(!handleLog)
}


const handleSignUp = async (event) => {
  event.preventDefault()
  try {
    const user = await SignUpService.signUp({
      userName,
      name,
      password
    }) 
    window.localStorage.setItem(
      'userlogged',JSON.stringify(user))
    setUserLogged(user)
   
    console.log(userLogged)
  }
  catch(e){
    console.error(e)
  }
}
  
  return <main>
{handleLog ?<>
<Card sx={{maxWidth :345}} >
  <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleLogin}
    >
     <TextField
        helperText="Please enter your username"
        id="demo-helper-text-aligned"
        label="username"
        onChange={((event) => setUsername(event.target.value))}
      />
          <TextField
            id="outlined-adornment-password"
            label="Password"
            type= 'password' 
            helperText='Please enter your password'
            onChange={event => setPassword(event.target.value)}
    ></TextField>
    <div className='loginButton'>
      <button>
      <Tooltip title='Log-in'>
     <IconButton aria-label="fingerprint" color="success" sx={{width:'40px', height:'40px' }}>
        <Fingerprint  sx={{ fontSize: 40}}/>
      </IconButton>
      </Tooltip>
      </button>
      </div>
    </Box>
    
   <p>Don´t you have an account? Go <strong onClick={handleLogStatus}>register</strong></p></Card></>
  

 : <Card sx={{maxWidth :345}} >
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSignUp}
    >
     <TextField
        helperText="Please enter your username"
        id="demo-helper-text-aligned"
        label="username"
        onChange={((event) => setUsername(event.target.value))}
      />
      <TextField
        helperText="Please enter your Name"
        id="demo-helper-text-aligned"
        label="Name"
        onChange={((event) => setName(event.target.value))}
      />
          <TextField
            id="outlined-adornment-password"
            label="Password"
            type= 'password' 
            helperText='Please enter your password'
            onChange={event => setPassword(event.target.value)}
    ></TextField>
    <div className='loginButton'>
      <button>
      <Tooltip title='Sign Up'>
     <IconButton aria-label="fingerprint" color="success" sx={{width:'40px', height:'40px' }}>
        <Fingerprint  sx={{ fontSize: 40}}/>
      </IconButton>
      </Tooltip>
      </button>
      </div>
    </Box>
    <p>Do you have an account? Go <strong onClick={handleLogStatus}>log in</strong></p>
 </Card>  
 }
 <style jsx>{`
  .loginButton {
    display:flex;
    justify-content:center
  }
 
  p{
    color: rgba(0, 0, 0, 0.6);
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.66;
    letter-spacing: 0.03333em;
    text-align: left;
    margin-top: 3px;
    margin-right: 14px;
    margin-bottom: 0;
    margin-left: 14px;
}
strong{
  color:#1976d2;
  cursor:pointer
}
  button {
    border: none;
    background: none;
  }
  main {
    display:flex;
    align-items:center;
    justify-content:center;
    height:100vh
  }
 `}</style>
</main>
}
