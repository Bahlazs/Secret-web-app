
import NavBar from "./components/NavBar.jsx";
import AddSecret from "./components/secret_components/AddSecret.jsx";
import SecretPage from "./components/secret_components/SecretPage.jsx";
import About from "./components/About.jsx";
import Contacts from "./components/Contacts.jsx";

function App() {
    return (
        <>
            <NavBar/>
            <About/>
            <AddSecret/>
            <SecretPage/>
            <Contacts/>
        </>
    )
}

export default App
