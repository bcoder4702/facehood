import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiProvider,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import "./style.css";
import logo from "../assets/logo.png";
import FaceHood from "../assets/FaceHood.png";
import animation from "../assets/animation.gif";
import fh from "../assets/fh.png";
import meeticon from "../assets/meeticon.png";

import React from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth, firebaseDB, usersRef } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, uid },
    } = await signInWithPopup(firebaseAuth, provider);

    if (email) {
      const firestoreQuery = query(usersRef, where("uid", "==", uid));
      const fetchedUser = await getDocs(firestoreQuery);
      if (fetchedUser.docs.length === 0) {
        await addDoc(collection(firebaseDB, "users"), {
          uid,
          name: displayName,
          email,
        });
      }
      dispatch(setUser({ uid, email: email!, name: displayName! }));
      navigate("/");
    }
  };
  return (
    <EuiProvider colorMode="light">
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ width: "100vw", height: "100vh" , padding: "0 20px"}}
      >
        <EuiFlexItem grow={false}>
          {/* <EuiPanel paddingSize="xl"> */}
            <EuiFlexGroup justifyContent="center" alignItems="center">
              <EuiFlexItem>
                 <EuiImage src={animation} alt="logo" /> 
              </EuiFlexItem>
              <EuiFlexItem>
              <EuiFlexGroup justifyContent="center" alignItems="center" direction="column">
                <EuiImage src={meeticon} alt="logo" size="230px" />
                <h2 style={{fontSize: "50px", fontWeight: "bold"}}>FaceHood</h2>
                </EuiFlexGroup>
                {/* <EuiImage src={fh} alt="logo" size="230px" /> */}
                <EuiSpacer size="s" />
                <EuiText textAlign="center" grow={false}>
                  <h3>
                    <EuiTextColor>Unveil your voice,</EuiTextColor>
                    <EuiTextColor color="#D81B60"> anonymously</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiSpacer size="l" />
                <EuiButton className="custombtn" style={{ background: "#D81B60" }} fill onClick={login}>
                  Login with Google
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          {/* </EuiPanel> */}
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
}

export default Login;
