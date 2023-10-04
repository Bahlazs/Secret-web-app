import {useState} from "react";
import '../../stylesheets/SecretPage.css';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";


const SecretPage = ({getSecretHashId}) => {
    const [secret, setSecret] = useState("No Secret")
    const [secretHashId, setSecretHashId] = useState("")

    const handlePasswordChange = (event) => {
        setSecretHashId(event.target.value);
        getSecretHashId(event.target.value)
    };

    const getSecret = async () => {
        setSecret("LOADING")
        try {
            const response = await fetch(`https://secret-server-qa3r.onrender.com/secret/${secretHashId}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json'
                }
            })
            const data = await response.json()
            if (response.status === 200) {
                console.log(data)
                setSecret(data["text"])
            } else {

                console.error(data["error"])
                setSecret("No Secret")
            }
        } catch (error) {
            setSecret("No secret found")

        }
    }



    return (
        <div className={"secret-page"}>
            <h1>Get secret here</h1>
            <div className={"password-field"}>
                <input
                    type="password"
                    minLength={20}
                    value={secretHashId}
                    onChange={handlePasswordChange}
                />
                <button className={"app-button"} type="button" onClick={getSecret}>Get Secret</button>
            </div>
            <div className={"secret-box"}>
                <div className={"secret-card"}><p className={"secret-text"}>{secret}</p></div>
                <Link to={"/share-secret"} className="app-button" > Share Secret</Link>
            </div>

        </div>

    )
}

SecretPage.propTypes = {
    getSecretHashId: PropTypes.func
}


export default SecretPage;