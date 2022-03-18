import { useEffect ,useContext} from "react"
import {UserContext} from '../pages/_app'
import { useRouter } from "next/dist/client/router"

export default function Header(){
    const router = useRouter()
    const {userLogged,setUserLogged} = useContext(UserContext)

    const handleLogOut = () => {
        window.localStorage.removeItem('userlogged');
        setUserLogged(null)
        console.log(userLogged)
    }
    return <><button onClick={handleLogOut}>LogOut</button> <button onClick={() => router.push('/home')}>Home</button><style jsx>{`
        button{
            display:flex;
            flex-direction:row;
            align-items: center;
            appearance: none;
            background-color: #FCFCFD;
            border-radius: 4px;
            border-width: 0;
            box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
            box-sizing: border-box;
            color: #36395A;
            display: inline-flex;
            font-family: "JetBrains Mono",monospace;
            height: 48px;
            justify-content: center;
            line-height: 1;
            list-style: none;
            overflow: hidden;
            padding-left: 16px;
            padding-right: 16px;
            text-align: left;
            text-decoration: none;
            transition: box-shadow .15s,transform .15s;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            white-space: nowrap;
            will-change: box-shadow,transform;
            font-size: 18px;
        }
    
    `}</style></>
}