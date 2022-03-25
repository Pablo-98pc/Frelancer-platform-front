import { useEffect ,useContext} from "react"
import {UserContext} from './_app'
import { useRouter } from 'next/router'
import Header from "../components/header"
import Posts from "../components/posts"
import CreatePosts from "../components/createPost"
import Link from 'next/link'
import Chats from "../components/chats"
import NewChat from "../components/newChat"


export default function Home() {
    const {userLogged,setUserLogged} = useContext(UserContext)
    const router = useRouter();
    useEffect(()=> {
        if(!userLogged){
            router.push('/')
        }
      
    })

    return <><Header></Header><div className="posts"><Posts></Posts></div><CreatePosts></CreatePosts><Chats></Chats><style jsx>{`
        .posts{
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
        }

    `}</style></>

}