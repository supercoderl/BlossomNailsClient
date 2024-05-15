import './App.css';
import MainRoutes from './routes/MainRoutes';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [display, setDisplay] = useState("block");
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(0);
      setTimeout(() => {
        setDisplay("none");
      }, 1500);
    }, 1500);
  }, []);

  return (
    <GoogleOAuthProvider clientId="609159450096-eoh4m0tb2mumkfi72ncmi9jucfk0uuoc.apps.googleusercontent.com">
      <ToastContainer />
      <div id="preloader" style={{ display, opacity }}>
        <div id="status">
          <img src="https://webstrot.com/html/pulchritude/nail-art/images/loader.gif" id="preloader_image" alt="loader" />
        </div>
      </div>
      <MainRoutes />
    </GoogleOAuthProvider>
  );
}

export default App;
