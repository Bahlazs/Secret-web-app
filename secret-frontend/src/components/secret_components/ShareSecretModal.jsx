import {useState} from 'react';
import PropTypes from 'prop-types';
import "../../stylesheets/ShareForm.css"

const ShareSecretModal = ({onClose, onShare}) => {
    const [shareSecretFormData, setShareSecretFormData] = useState({
        name: "",
        subject: "",
        email: "",
    })

    const handleInputChange = event => {
        setShareSecretFormData({...shareSecretFormData, [event.target.name]: event.target.value});
    };
    const handleShareClick = (event) => {
        event.preventDefault()
        onShare(shareSecretFormData);
    };

    return (
        <div className="share-secret-modal">
            <h2>Share Secret</h2>
            <form className={"add-secret-form"} onSubmit={handleShareClick}>
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
                    <button className={"app-button"} onClick={onClose}>Close</button>
                </div>
            </form>
        </div>
    );
};

ShareSecretModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
};

export default ShareSecretModal;
