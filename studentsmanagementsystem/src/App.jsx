import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/login";
import { Navbar } from "./components/navbar";
import { Signup } from "./components/signup";
import { Home } from "./components/home";
import { Private } from "./private/private";
import { School } from "./components/school";
import { Students } from "./components/students";
import { AllSchool } from "./components/allschool";
import { StudentLogin } from "./components/studentlogin";
import { StudentDashboard } from "./components/studentdashboard";
import { NotificationDashboard } from "./components/notification";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Private Component={Home} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/school" element={<Private Component={School} />} />
        <Route path="/students" element={<Private Component={Students} />} />
        <Route path="/allschool" element={<Private Component={AllSchool} />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route
          path="/notification"
          element={<Private Component={NotificationDashboard} />}
        />
      </Routes>
    </>
  );
}

export default App;
