import {useState} from "react";
import "E:\\projects\\homework\\allmyles-ho\\Secret-server\\secret-frontend\\src\\stylesheets\\AddSecret.css"

const AddSecret = () => {
    const [secretFormData, setSecretFormData] = useState({
        code:"",
        secret:"",
        email:"",
        expDate:""

    })

    const handleSubmit = async () => {
        const response = await fetch(`/secret`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                code: secretFormData.code,
                secret: secretFormData.secret,
                email: secretFormData.email,
                expDate: secretFormData.expDate
            })
        });
        if (response.status === 200) {
            alert('Secret Added');
        } else {
            alert('Something went wrong');
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
                    <label className={"code-label label"} htmlFor="code">Code to be hashed:</label>
                    <input type="password" id="code" name="code"
                           value={secretFormData.code}
                           onChange={handleInputChange} />
                </div>

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
                    <label className={"exp-date-label label"} htmlFor="exp-date">Expiration Date:</label>
                    <input type="date" id="exp-date" name="expDate"
                           value={secretFormData.expDate}
                           onChange={handleInputChange} />
                </div>
                <input className={"submit-button form-element"} type={"submit"} value={"Add Secret"}/>
            </form>
        </div>
    )
}

export default AddSecret