import {useState} from "react";
import ShareSecretModal from "./ShareSecretModal.jsx";
import {v4 as uuidv4} from 'uuid';
import '../../stylesheets/SecretPage.css';

const SecretPage = () => {
    const [secret, setSecret] = useState("No Secret")
    const [password, setPassword] = useState("")
    const [showModal, setShowModal] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const getSecret = async () => {
        setSecret("LOADING")
        const response = await fetch(`/secret/${password}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            }
        })
        if (response.status === 200) {
            const data = await response.json()
            console.log(data)
            setSecret(data["secret"])
        } else {
            alert("something went wrong")
            setSecret("No Secret")
        }
    }

    const shareSecret = async (shareSecretData) => {
        // Generate a random link (UUID)
        const randomId = uuidv4();


        // Send a POST request to your backend to associate the random link with the secret
        const response = await fetch("secret/share", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hashId: password,
                name: shareSecretData.name,
                subject: shareSecretData.subject,
                email: shareSecretData.email,
                shareId: randomId
            })
        });

        if (response.status === 200) {
            setShowModal(false); // Close the modal after sharing
        } else {
            alert("Failed to share secret.");
        }
    };

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
                <button className={"app-button"} type="button" onClick={getSecret}>Get Secret</button>
            </div>
            <div className={"secret-box"}>
                <div className={"secret-card"}><p className={"secret-text"}>{secret}</p></div>
                <button className="app-button" onClick={() => setShowModal(true)}> Share Secret</button>
            </div>
            {showModal && (
                <ShareSecretModal
                    onClose={() => setShowModal(false)}
                    onShare={shareSecret}
                />
            )}
        </div>

    )
}

export default SecretPage;