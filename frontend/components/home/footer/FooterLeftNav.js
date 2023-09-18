import { AiFillHome } from "react-icons/ai";
import left_nav from '@/styles/footer.module.css'
import {BsInfoCircleFill} from "react-icons/bs"
import {SiMinutemailer} from "react-icons/si"
import Link from "next/link";
function FooterLeftNav(){
    return(
        <div>
            <ul className={left_nav.ul}>
                <Link href={'/'}><li className={left_nav.li}><AiFillHome/>Home</li></Link>
                <Link href={'/about'}><li className={left_nav.li}><BsInfoCircleFill/>About</li></Link>
                <Link href={'/contact'}><li className={left_nav.li_contact} ><SiMinutemailer/>Contact</li></Link>
            </ul>
        </div>
        
    )
}
export default FooterLeftNav;