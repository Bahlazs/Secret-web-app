import "E:\\projects\\homework\\allmyles-ho\\Secret-server\\secret-frontend\\src\\stylesheets\\SecretPage.css"
import {useState} from "react";

const SecretPage = () => {
    const [secret, setSecret] = useState("No Secret")
    const [password, setPassword] = useState("")

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const getSecret = async () => {
        setSecret("LOADING")
        const response = await fetch("/secret/" + password, {
            method: "GET",
            headers: {
                'Accept':'application/json'
            }
        })
        if (response.status === 200) {
            setSecret(response.json())
        } else {
            alert("something went wrong")
            setSecret("No Secret")
        }
    }

    return (
        <div className={"secret-page"}>
            <h1>Get secret here</h1>
            <div className={"password-field"}>
                <input
                    type="password"
                    minLength={20}
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button className={"submit-button"} type="button" onClick={getSecret}>Get Secret</button>
            </div>
            <div className={"secret-box"}>
                <div className={"secret-card"}><p className={"secret-text"}>{secret}</p></div>
                <button className={"submit-button"}> Share Secret</button>
            </div>
        </div>

    )
}

export default SecretPage;