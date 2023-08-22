import s from '@/styles/components/Navbar.module.css'
import LoginBtn from "@/components/LoginBtn";

export default function Navbar() {
    return (
        <nav className={s.navbar}>
            <div className={s.title}>Job Tracker</div>
            <div className={s.navRight}>
                <LoginBtn />
            </div>
        </nav>
    )
}