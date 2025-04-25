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
    console.log('Received ID Token:', idToken);  // Log the token to verify
  
    const decoded = jwtDecode(idToken);
    console.log('Decoded Token:', decoded);
  
    try {
      const res = await axios.post('http://localhost:3000/api/v1/register/auth/google-login', {
        idToken,
      });
  
      console.log('Server response:', res.data);  // Ensure the server returns the correct response
  
      // Assuming the response contains the user data
      const { user, token } = res.data;
  
      // Save the user ID and token to localStorage
      if (user && user.id) {
        localStorage.setItem("user_Id", user.id);
      }
  
      if (token && token.access && token.access.token) {
        localStorage.setItem("user_token", token.access.token);
      }
  
      navigate('/'); // Redirect after login
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
    }
  };
  
  
  return <div id="googleSignInDiv"></div>;
};

export default GoogleLoginButton;
