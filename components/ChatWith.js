import axios from "axios"
import { useEffect, useState,useContext,useRef } from "react"
import { UserContext } from "../pages/_app";
import { io } from "socket.io-client";
import { ChatMessagesWith } from "./chats";
import CloseIcon from '@mui/icons-material/Close';



const Chat = () => {
    const {messagesWith,setMessagesWith} = useContext(ChatMessagesWith)
    const [messages,setMessages] = useState([])
    const [arrivalMessages,setArrivalMessages] = useState(null)
    const {userLogged,setUserLogged} = useContext(UserContext)
    const [msg,setMsg] = useState('')
    const socket = useRef();
    const scrollRef = useRef();
    

    useEffect( async ()=> {
        if(userLogged && messagesWith != undefined){
          const {data} = await axios.post('http://localhost:3001/api/messages/getMessages',{
            from : userLogged.userName,
            to : messagesWith
        })
        setMessages(data)  
      
        }
        
    },[messagesWith])

    useEffect(() => {
        
        
        if (userLogged && messagesWith != undefined) {
          socket.current = io('http://localhost:3001', {
            withCredentials: true
          });
          socket.current.on('connection')
          socket.current.emit("add-user", userLogged.userName);
        }
      }, [messagesWith]);

    const handleSendMsg = async (e) => {
        e.preventDefault()
        socket.current.emit("send-msg", {
            to: messagesWith,
            from: userLogged.userName,
            msg : {text: msg} ,
          });
        try {
         const {data} =  await axios.post('http://localhost:3001/api/messages/sendMessages',{
            from : userLogged.userName,
            to: messagesWith,
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
    useEffect(() => {
        if (socket.current) {
          console.log('pasa')
          socket.current.on("msg-recieve", (msg) => {
            console.log(msg.text)
            setArrivalMessages({ fromSelf: false, message: msg.text});
            
          });
        }
      },[socket]);

      const handleCloseChat = () => {
        setMessagesWith(null)
      }

    
      useEffect(() => {
        arrivalMessages && setMessages((prev) => [...prev, arrivalMessages]);
      }, [arrivalMessages]);
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);
    
      return <>{messagesWith ? <div className="chat">
        <div className="chatUser">
          <h3>{messagesWith}</h3>
          <CloseIcon onClick={handleCloseChat}/>
        </div>
      <div className="chatContainer">
      {messages.map((e,i)=> <p key={i} className={`${e.fromSelf ? "sended" : "recieved"}`}> {e.message}</p>)}
      </div>
      <form onSubmit={handleSendMsg}>
         <input value={msg} type='text' onChange={(e)=> setMsg(e.target.value)}></input>  
      </form>
     </div>
      : null }
      <style jsx>{`
      .chat{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
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
      
      .chatContainer {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        height:300px;
        width:300px;
      }
      .recieved {
        display:flex;
        justify-content:flex-end;
        background:rgba(0, 40, 145, 0.1);
        border-radius:10px;
      }
      .sended{
        background:rgba(9, 29, 77, 0.1);
        border-radius:10px;
      }
      .chatUser{
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        width:100%
      }
  
     
     `}</style>
      
      </>
}
 export default Chat