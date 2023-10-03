import About from "./About.jsx";
import AddSecret from "./secret_components/AddSecret.jsx";
import SecretPage from "./secret_components/SecretPage.jsx";
import Contacts from "./Contacts.jsx";
import NavBar from "./NavBar.jsx";

const MainPage = () => {
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

export default MainPage