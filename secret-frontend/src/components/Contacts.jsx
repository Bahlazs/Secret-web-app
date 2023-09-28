import '../stylesheets/Contacts.css'
import {AiFillLinkedin, AiOutlineMail, AiFillGithub} from "react-icons/ai"
import {BsTelephone} from "react-icons/bs"

const Contacts = () => {
    return (
        <div className={"contacts"}>
            <h1>Contacts</h1>
            <div className="contacts-card" >
                <div className="email"><AiOutlineMail className={"icon"}/><p className={"footer-item"} >nick.balazs18@gmail.com</p></div>
                <div className="linkedin"><AiFillLinkedin className={"icon"}/><a  className={"footer-item link"} href="https://www.linkedin.com/in/balazs-nick">Nick Balázs</a></div>
                <div className="linkedin"><AiFillGithub className={"icon"}/><a  className={"footer-item link"} href="https://github.com/Bahlazs">GitHub</a></div>
                <div className="tel"><BsTelephone className={"icon"}/><p className={"footer-item"} >+36 30 530 1304</p></div>
            </div>
        </div>
    )
}

export default Contacts