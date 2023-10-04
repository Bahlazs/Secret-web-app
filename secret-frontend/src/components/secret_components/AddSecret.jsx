import {useState} from "react";
import "../../stylesheets/AddSecret.css"
import useToast from "../../custom_hooks/UseToast.jsx";

const AddSecret = () => {
    const { showToast, toastElement } = useToast();
    const [secretFormData, setSecretFormData] = useState({
        secret:"",
        email:"",
        expireAfterViews:0,
        expireAfter:0

    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch(`/secret`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                secret: secretFormData.secret,
                email: secretFormData.email,
                expireAfterViews: secretFormData.expireAfterViews,
                expireAfter: secretFormData.expireAfter
            })
        });
        const data = await response.json()
        if (response.status === 200) {
            showToast('Secret Added');
            console.log(data["message"])
        } else {
            alert("invalid, input")
            console.error(data["error"]);
        }
    }

    const handleExpireAfterMinuteAndViewChange = event => {
        if (event.target.value >= 0) {
            setSecretFormData({ ...secretFormData, [event.target.name]: event.target.value })
        }
    }

    const handleInputChange = event => {
        setSecretFormData({ ...secretFormData, [event.target.name]: event.target.value });
    };

    return (
        <div className={"add-secret"}>
            {toastElement}
            <h1>Add secret here</h1>
            <form className={"add-secret-form"} onSubmit={handleSubmit}>
                <div className={"form-element"}>
                    <label className={"secret-label label" } htmlFor="secret">Your secret:</label>
                    <textarea cols={40} rows={20} id="secret" name="secret"
                           value={secretFormData.secret}
                           onChange={handleInputChange} />
                </div>

                <div className={"form-element"}>
                    <label className={"email-label label"} htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email"
                           value={secretFormData.email}
                           onChange={handleInputChange} />
                </div>

                <div className={"form-element"}>
                    <label className={"code-label label"} htmlFor="views">How much times the secret can be viewed :</label>
                    <input type="number" id="views" name="expireAfterViews"
                           value={secretFormData.expireAfterViews}
                           onChange={handleExpireAfterMinuteAndViewChange} />
                </div>

                <div className={"form-element"}>
                    <label className={"exp-date-label label"} htmlFor="exp-date">Expiration Date:</label>
                    <input type="number" id="exp-date" name="expireAfter"
                           value={secretFormData.expireAfter}
                           onChange={handleExpireAfterMinuteAndViewChange} />
                </div>
                <input className={"app-button form-element"} type={"submit"} value={"Add Secret"} />
            </form>
        </div>
    )
}

export default AddSecret