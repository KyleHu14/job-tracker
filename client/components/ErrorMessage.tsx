// Styles
import s from "@/styles/components/ErrorMessage.module.css";

// Next Components
import Image from "next/image";

export default function ErrorMessage() {
  return (
    <div className={s.container}>
      <Image src="/images/error-exclamation.png" width="60" height="60" alt="Exclamation Mark Error Image"/>
      <div className={s.title}>Error</div>
      <div className={s.text}>
        An error occured while trying to fetch your job applications. 
        Try refreshing the page or contacting us if this problem persists.
       </div>
    </div>
  )
}