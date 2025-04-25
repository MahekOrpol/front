import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '1022906991298-dp12dcl5f3uo96r4l75f10j8jk8pd7on.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  const handleCallbackResponse = async (response) => {
    const idToken = response.credential;
    const decoded = jwtDecode(idToken);
    console.log('Decoded Token:', decoded);

    try {
      const res = await axios.post('https://dev.crystovajewels.com/api/auth/google-login', {
        idToken,
      });

      console.log('Server response:', res.data);

      // Redirect user after successful login
      navigate('/'); // change this path as per your app's flow
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
    }
  };

  return <div id="googleSignInDiv"></div>;
};

export default GoogleLoginButton;
