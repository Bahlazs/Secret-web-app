import {useState} from 'react';
import PropTypes from 'prop-types';
import "../../stylesheets/ShareSecretPage.css"
import {v4 as uuidv4} from "uuid";
import {Link, useNavigate} from "react-router-dom";
import useToast from "../../custom_hooks/UseToast.jsx";

const ShareSecretPage = ({ secretId }) => {
    const navigate = useNavigate()
    const { showToast, toastElement } = useToast();
    const [shareSecretFormData, setShareSecretFormData] = useState({
        name: "",
        subject: "",
        email: "",
    })

    const returnHome = () => {
        setTimeout(()=>{
            navigate("/")
        }, 3000)
    }
    const shareSecret = async () => {
        const randomId = uuidv4();

        const response = await fetch("secret/share", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hashId: secretId,
                name: shareSecretFormData.name,
                subject: shareSecretFormData.subject,
                email: shareSecretFormData.email,
                shareId: randomId
            })
        });
        const data = await response.json()
        if (response.status === 200) {
            showToast(data["message"])
            returnHome()
        } else {
            alert("Failed to share secret.");
            console.error(data["error"])
        }
    };
    const handleInputChange = event => {
        setShareSecretFormData({...shareSecretFormData, [event.target.name]: event.target.value});
    };
    const handleShareClick = (event) => {
        event.preventDefault()
        shareSecret();
    };

    return (
        <div className="share-secret-page">
            {toastElement}
            <h2>Share Secret</h2>
            <form className={"share-secret-form"} onSubmit={handleShareClick}>
                <div className={"form-element"}>
                    <label className={"email-label label"} htmlFor="name">Your name:</label>
                    <input type="text" id="name" name="name"
                           value={shareSecretFormData.name}
                           onChange={handleInputChange}/>
                </div>
                <div className={"form-element"}>
                    <label className={"email-label label"} htmlFor="subject">Email subject:</label>
                    <input type="text" id="subject" name="subject"
                           value={shareSecretFormData.subject}
                           onChange={handleInputChange}/>
                </div>
                <div className={"form-element"}>
                    <label className={"email-label label"} htmlFor="share-email">Email:</label>
                    <input type="email" id="share-email" name="email"
                           value={shareSecretFormData.email}
                           onChange={handleInputChange}/>
                </div>
                <div className={"modal-button-container"}>
                    <button className={"app-button"} type={"submit"}>Share</button>
                    <Link to={"/"} className={"app-button"} >Back</Link>
                </div>
            </form>
        </div>
    );
};

ShareSecretPage.propTypes = {
    secretId: PropTypes.string
}

export default ShareSecretPage;
