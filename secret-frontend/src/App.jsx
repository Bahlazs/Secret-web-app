import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from "./components/NavBar.jsx";
import SecretDisplayPage from './components/secret_components/SecretDisplayPage.jsx';
import About from "./components/About.jsx";
import AddSecret from "./components/secret_components/AddSecret.jsx";
import SecretPage from "./components/secret_components/SecretPage.jsx";
import Contacts from "./components/Contacts.jsx";
import ShareSecretPage from "./components/secret_components/ShareSecretPage.jsx";
import {useState} from "react";

function App() {
    const [secretHashId, setSecretHashId] = useState("")

    return (
        <>
            <Router>
                <NavBar/>
                <Routes>
                    <Route path={"/"} Component={About}/>
                    <Route path={"/add-secret"} Component={AddSecret}/>
                    <Route path={"/get-secret"} element={<SecretPage getSecretHashId={setSecretHashId}/>}/>
                    <Route path={"/contacts"} Component={Contacts}/>
                    <Route path={"/share-secret"} element={<ShareSecretPage secretId={secretHashId}/>}/>
                    <Route path="/share-secret/:shareId" Component={SecretDisplayPage}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
