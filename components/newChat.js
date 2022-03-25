import axios from "axios";
import { useEffect, useState,useContext } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { ChatOpenContext } from "./chats";
import { ChatMessagesWith } from "./chats";
import { UserContext } from "../pages/_app";


const NewChat = ()=> {
    const [value,setValue] = useState('')
    const [users,setUsers] = useState([])
    const {openNewMessage,setOpenNewMessage} = useContext(ChatOpenContext)
    const [errorMessage,setErrorMessage] = useState()
    const [user,setUser] = useState('')
    const {messagesWith,setMessagesWith} = useContext(ChatMessagesWith)
    const [msg,setMsg] = useState('')
    const [messages,setMessages] = useState([])
    const {userLogged,setUserLogged} = useContext(UserContext)



    useEffect(()=> {
        const fetchDataSearch = async() => {
            const {data} = await axios.get(`http://localhost:3001/api/users/searchUsers/${value}`)
            if(data.length == 0){
                console.log('entra')
                setErrorMessage('Not result founds')
            }else {
                setUsers(data)  
            }
            
        }
        if(value.length > 1){
            fetchDataSearch()
        }else {
            setUsers([])
        }
        
        

    },[value])

    const handleUser = (us) => {
        setUser(us.userName)

    }


    useEffect(async ()=> {
        if(user){
            const {data} = await axios.post('http://localhost:3001/api/messages/getMessages',{
                from : userLogged.userName,
                to : user
            })
            setMessages(data)  
            }
    },[user])

    const handleSendNewMessage = async (e) => {
        e.preventDefault()
        if(user){
        try {
            const {data} =  await axios.post('http://localhost:3001/api/messages/sendMessages',{
               from : userLogged.userName,
               to: user,
               message :  msg ,
           })
           const msgs = [...messages]
           msgs.push({fromSelf:true,message:msg})
           setMessages(msgs)  
           setMsg('')
           if(data.msg){
             return false
           } else {
             userLogged.chats = data
             window.localStorage.setItem(
               'userlogged',JSON.stringify(userLogged))
           }
   
           
           } catch (error) {
               console.error(error)
           }
        } 
    }
    const handleCloseMessage = () => {
        setOpenNewMessage(false)
        setUser('')
        setValue('')
        setUsers([])
    }


    return <>{openNewMessage ? <div className= {messagesWith ? "newMessageShowSpace" :"newMessageShow" }><CloseIcon onClick={handleCloseMessage}/>{user ? <div>{user}<div>{messages.map((e,i)=> <p key={i}>{e.message}</p>)}</div></div> :<div><input type="text" placeholder="Buscar un usuario" onChange={(e)=> setValue(e.target.value)}></input>
    {users.length == 0 && value.length > 1  ? <p>{errorMessage}</p> : users.map((us,i)=> <p key={i} onClick={()=> handleUser(us)}>{us.userName}</p>)}</div>  }  
    <form onSubmit={handleSendNewMessage}><input type="text" value={msg} placeholder="Enviar mensaje" onChange={(e)=> setMsg(e.target.value)}></input></form></div> : null}<style jsx>{`
        

        .newMessageShow{
            position:fixed;
            bottom:0;
            right:25%;
            transform: translateY(50px);
            z-index: 1;
            padding:10px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
            cursor:pointer;
            width:250px;
            animation: aparition 1s ease forwards;
        }
        .newMessageShowSpace{
            position:fixed;
            bottom:0;
            right:50%;
            transform: translateY(50px);
            z-index: 1;
            padding:10px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
            cursor:pointer;
            width:250px;
            animation: aparition 1s ease forwards;
        }
    `}</style></>
}

export default NewChat