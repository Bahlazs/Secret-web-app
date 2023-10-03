import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from "./components/NavBar.jsx";
import MainPage from "./components/MainPage.jsx";
import SecretDisplayPage from './components/secret_components/SecretDisplayPage.jsx'; // Import the new component

function App() {
    return (
        <>
            <Router>

                <Routes>
                    <Route path={"/"} Component={MainPage}/>
                    <Route path="/share-secret/:shareId" Component={SecretDisplayPage}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
