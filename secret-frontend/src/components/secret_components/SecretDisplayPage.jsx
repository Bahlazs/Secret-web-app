import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../stylesheets/SecretDisplayPage.css';

const SecretDisplayPage = () => {
    const { shareId } = useParams();
    const [secret, setSecret] = useState("Loading...");

    useEffect(() => {
        async function fetchSecret() {
            try {
                const response = await fetch(`https://secret-server-qa3r.onrender.com/secret/share/${shareId}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.status === 200) {
                    setSecret(data["text"]);
                } else {
                    console.error(data["error"]);
                }
            } catch (error) {
                console.error("Error fetching secret:", error);
                setSecret("Error fetching secret");
            }
        }

        fetchSecret();
    }, [shareId]);

    return (
        <div className="secret-display-page">
            <h1>Secret Display Page</h1>
            <div className={"secret-box"}>
                <div className={"secret-card"}><p className={"secret-text"}>{secret}</p></div>
            </div>
        </div>
    );
};

export default SecretDisplayPage;