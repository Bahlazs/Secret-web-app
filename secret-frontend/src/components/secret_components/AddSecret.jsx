import {useState} from "react";
import "../../stylesheets/AddSecret.css"

const AddSecret = () => {
    const [secretFormData, setSecretFormData] = useState({
        secret:"",
        email:"",
        views:0,
        expDate:""

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
                views: secretFormData.views,
                expDate: secretFormData.expDate
            })
        });
        if (response.status === 200) {
            alert('Secret Added');
        } else {
            console.log('Something went wrong');
        }
    }

    const handleInputChange = event => {
        setSecretFormData({ ...secretFormData, [event.target.name]: event.target.value });
    };

    return (
        <div className={"add-secret"}>
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
                    <input type="number" id="" name="views"
                           value={secretFormData.views}
                           onChange={handleInputChange} />
                </div>

                <div className={"form-element"}>
                    <label className={"exp-date-label label"} htmlFor="exp-date">Expiration Date:</label>
                    <input type="datetime-local" id="exp-date" name="expDate"
                           value={secretFormData.expDate}
                           onChange={handleInputChange} />
                </div>
                <input className={"app-button form-element"} type={"submit"} value={"Add Secret"} />
            </form>
        </div>
    )
}

export default AddSecret