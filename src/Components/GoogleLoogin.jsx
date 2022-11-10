import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
const clientId =
  "708389688723-hkn7uad1out9ppc7m5vekks4l62dt27o.apps.googleusercontent.com";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  imageUrl: "",
  googleId: "",
  tokenId: "",
  profile: "",
};

function GoogleLoogin() {
  const [iState, updateState] = useState(initialState);
  const { firstName, lastName, email, imageUrl, googleId, tokenId, profile } =
    iState;

  const responseGoogle = (response) => {
    console.log(response);
    updateState({
      ...iState,
      profile: response?.profileObj,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      email: response.profileObj.email,
      googleId: response.profileObj.googleId,
      tokenId: response?.tokenId,
      imageUrl: response.profileObj.imageUrl,
    });
  };

  const logOut = () => {
    updateState(initialState);
  };
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });
  return (
    <>
      <div>GoogleLogin</div>
      <div>
        <h2>React Google Login</h2>
        <br />
        <br />
        {profile ? (
          <div>
            <img src={imageUrl} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {firstName}</p>
            <p>Email Address: {lastName}</p>
            <h1>{`firstName-->, ${firstName}`}</h1>
            <h1>{`lastName-->, ${lastName}`}</h1>
            <h1>{`googleId-->, ${googleId}`}</h1>
            <h1>{`email-->, ${email}`}</h1>
            <h1>{`tokenId-->, ${tokenId}`}</h1>
            <br />
            <br />
            <GoogleLogout
              clientId={clientId}
              buttonText="Log out"
              onLogoutSuccess={logOut}
            />
          </div>
        ) : (
          <GoogleLogin
            clientId="708389688723-hkn7uad1out9ppc7m5vekks4l62dt27o.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        )}
      </div>

      {/* <GoogleLogin
        clientId="708389688723-hkn7uad1out9ppc7m5vekks4l62dt27o.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        isSignedIn={true}
        cookiePolicy={"single_host_origin"}
      /> */}

      {/* <GoogleLogin
  clientId="708389688723-hkn7uad1out9ppc7m5vekks4l62dt27o.apps.googleusercontent.com"
  onSuccess={responseGoogle}
/> */}

      {/* 
<GoogleLogout
      clientId="708389688723-hkn7uad1out9ppc7m5vekks4l62dt27o.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
      onFailure={logout}
    >
    </GoogleLogout>  */}
    </>
  );
}

export default GoogleLoogin;
