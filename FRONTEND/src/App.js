import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/home" 
            element={<PrivateRoute>
              <Home />
            </PrivateRoute>}
          />

          <Route path="*" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;