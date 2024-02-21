// Styles
import s from '@/styles/components/Navbar.module.css'

// Components
import LoginBtn from "@/components/LoginBtn";

// NextAuth Session Type
import Session from "@/types/next-auth"


export default function Navbar({ session } : any) {
    return (
        <nav className={s.navbar}>
            <div className={s.title}>Job Tracker</div>
            <div className={s.navRight}>
                <LoginBtn session = {session}/>
            </div>
        </nav>
    )
}