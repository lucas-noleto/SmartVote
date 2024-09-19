import styles from './Footer.module.css'
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'


function Footer (){
    return(
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li  >
                    <a href="https://www.youtube.com/watch?v=0xyxtzD54rM"><FaYoutube/></a>
                </li>
                <li >
                    <a href="https://www.youtube.com/watch?v=0xyxtzD54rM"><FaInstagram/></a>
                </li>
                <li >
                    <a href="https://www.youtube.com/watch?v=0xyxtzD54rM"><FaLinkedin/></a>
                </li>

                <li>
                    <a href="https://www.youtube.com/watch?v=0xyxtzD54rM"><FaGithub/></a>
                </li>


               
            </ul>
            
            <p className={styles.copy_right}>
                <span>SmartVote &copy; 2024 </span> 
            </p>

        </footer>
    )
}

export default Footer