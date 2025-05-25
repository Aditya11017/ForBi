import { BrowserRouter as Router, Routes, Route,Navigate,Outlet } from 'react-router-dom';
import Header from './header';
import Home from './home';
import Training from './Training';
import FormulaBIElite from './FormulaBIElite';
import ScrollTopBtn from './scrollTop';
import Footer from './footer';
import Login from './login';
import Sales from './sales';
import Spotlight from './spotlight';
import Dashboard from './Dashboard';
import Profile from './profile';
import LiveSessions from './LiveSessions';
import ExcelSymposium from './ExcelSym';
import PowerBISymposium from './PowerBISym';
import PythonSymposium from './PythonSym';
import SqlSymposium from './SqlSym';
import GenAISymposium from './GenAISym';
import SocSymposium from './SocSym';
import CompleteSymposium from './CompSym';
import ScrollToTop from './scrollToTop';
import Enroll from './enroll';
import EditInfo from './editInfo';
import Survey from './Survey';
import Specialist from './specialist';

export default function App() {
    return (
      <>
        <Router>
            <Header />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/Training" element={<Training />} />
                <Route path="/FormulaBIElite" element={<FormulaBIElite />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/spotlight" element={<Spotlight />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/LiveSessions" element={<LiveSessions />} />
                <Route path="/ExcelSymposium" element={<ExcelSymposium />} />
                <Route path="/PowerBISymposium" element={<PowerBISymposium />} />
                <Route path="/PythonSymposium" element={<PythonSymposium />} />
                <Route path="/SqlSymposium" element={<SqlSymposium />} />
                <Route path="/GenAISymposium" element={<GenAISymposium />} />
                <Route path="/SocSymposium" element={<SocSymposium />} />
                <Route path="/CompleteSymposium" element={<CompleteSymposium />} />
                <Route path="/Enroll" element={<Enroll />} />
                <Route path="/EditInfo" element={<EditInfo />} />
                <Route path="/Survey" element={<Survey />} />
                <Route path="/Specialist" element={<Specialist />} />



                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        <ScrollTopBtn />
        <Footer/>
        </Router>
        <Outlet/>
        </>
    );
}
