import { useEffect } from "react";

const GoogleLogin = () => {
  useEffect(() => {
    // Load the Google script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "765559507358-c081ske9jc3vf1m9nd63h256nin76nu4.apps.googleusercontent.com", // Replace with your actual client ID
          callback: (response) => {
            console.log("Google Credential Token", response.credential);
            // You can decode it or send to backend here
          },
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          {
            theme: "outline",
            size: "large",
            shape: "rectangular",
            text: "signin_with",
          }
        );

        // Optional One Tap
        window.google.accounts.id.prompt();
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="google-signin-btn"></div>;
};

export default GoogleLogin;
