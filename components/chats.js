import { useEffect, useState,useContext } from "react";
import Link from "next/link";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import NewChat from "./newChat";
import { createContext } from 'react'
import Chat from "./ChatWith";
import { UserContext } from "../pages/_app";


export const ChatOpenContext = createContext(undefined);
export const ChatMessagesWith = createContext(undefined)


export default function Chats(){
    const [chats,setChats] = useState([])
    const [open,setOpen] = useState(false)
    const [openNewMessage,setOpenNewMessage] = useState(false)
    const [messagesWith,setMessagesWith] = useState(null)
    const {userLogged,setUserLogged} = useContext(UserContext)

    const handleNewMessage = () => {
        setOpenNewMessage(true)
        
    }

    const handleOpenMessages = () => {
        setOpen(!open)
    }

    useEffect(()=> {
        if(userLogged){
            const loggedUserJSON = window.localStorage.getItem('userlogged');
            if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setChats(user.chats) 
        }
       
    }
    
    
    },[messagesWith,userLogged])
    
    const handleMessagesWith = (user) => {
        setMessagesWith(user)
    }

    return <><div className={open ? "messagesDivShow" :"messagesDiv" } > <div className="Title"><h4>Mensajes</h4>{open ? <ArrowDownwardIcon onClick={handleOpenMessages}/> : <ArrowUpwardIcon onClick={handleOpenMessages}/>}<DriveFileRenameOutlineIcon onClick={handleNewMessage}/></div>{chats.map((user,i) => <p key={i} onClick={()=> handleMessagesWith(user)} >{user}</p>)} </div><ChatMessagesWith.Provider value={{messagesWith,setMessagesWith}}><ChatOpenContext.Provider value={{openNewMessage,setOpenNewMessage}}><NewChat  openNewMessage={openNewMessage} setOpenNewMessage={setOpenNewMessage}/></ChatOpenContext.Provider>  <Chat/></ChatMessagesWith.Provider> <style jsx>{`
        .messagesDiv{
            position:fixed;
            bottom:0;
            right:1%;
            z-index: 1;
            padding:10px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
            cursor:pointer;
            width:250px;
            animation: close 1s ease forwards;
            transition-duration: 0.2s;
        }
        .messagesDivShow {
            position:fixed;
            bottom:0;
            right:10px;
            transform: translateY(50px);
            z-index: 1;
            padding:10px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
            cursor:pointer;
            width:250px;
            height:600px;
            animation: aparition 1s ease forwards;
            transition-duration: 0.2s;
            overflow:auto
            
        }
        .messagesDiv{
            bottom:-200px
        }

        @keyframes aparition {
            0%{transform: translateY(50px);}
            100%{transform: translateX(0px);}
        }

        @keyframes close {
            0%{transform: translateY(0px);}
            100%{transform: translateY(50px);}
        }
        .Title{
            display:flex;
            flex-direction:row;
            justify-content:space-between;
        }

        .messagesDiv:hover{
            background:
        }
        h4{
            display:flex;
            justify-content:center
        }
        .newMessageSpace{
            position:fixed;
        }
        
    
    `}</style></>


}