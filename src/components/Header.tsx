import {
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiImage,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { changeTheme } from "../app/slices/AuthSlice";
import {
  getCreateMeetingBreadCrumbs,
  getDashboardBreadCrumbs,
  getMeetingsBreadCrumbs,
  getMyMeetingsBreadCrumbs,
  getOneOnOneMeetingBreadCrumbs,
  getVideoConferenceBreadCrumbs,
} from "../utils/breadcrumbs";
import { firebaseAuth } from "../utils/firebaseConfig";
import { BreadCrumbsType } from "../utils/types";
import dashboard_logo from "../assets/dashboard_logo.png";
import lgout from "../assets/logout.webp";
import meeticon from "../assets/meeticon.png";
import "./style.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.name);
  const isDarkTheme = useAppSelector((zoomApp) => zoomApp.auth.isDarkTheme);
  const [breadCrumbs, setBreadCrumbs] = useState<Array<BreadCrumbsType>>([
    {
      text: "Dashboard",
    },
  ]);
  const dispatch = useDispatch();
  const [isResponsive, setIsResponsive] = useState(false);

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/") setBreadCrumbs(getDashboardBreadCrumbs(navigate));
    else if (pathname === "/create")
      setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
    else if (pathname === "/personal")
      setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate));
    else if (pathname === "/groupmeet")
      setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
    else if (pathname === "/mymeetings")
      setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate));
    else if (pathname === "/meetings") {
      setBreadCrumbs(getMeetingsBreadCrumbs(navigate));
    }
  }, [location, navigate]);

  const logout = () => {
    signOut(firebaseAuth);
  };

  // const invertTheme = () => {
  //   const theme = localStorage.getItem("zoom-theme");
  //   localStorage.setItem("zoom-theme", theme === "light" ? "dark" : "light");
  //   dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
  // };

  const section = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
            <EuiImage src={meeticon} alt="logo" size="90px" />
              <span className="custom" style={{ bottom: "33px" }}>FaceHood</span> 
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <>
          {userName ? (
            <EuiText>
              <h3>
                <EuiTextColor color="black">Welcome, </EuiTextColor>
                <EuiTextColor color="#D81B60">{userName}</EuiTextColor>
              </h3>
            </EuiText>
          ) : null}
        </>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          // style={{ gap: "2vw" }}
        >
          {/* <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            {isDarkTheme ? (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="sun"
                display="fill"
                size="s"
                color="warning"
                aria-label="theme-button-light"
              />
            ) : (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="moon"
                display="fill"
                size="s"
                color="ghost"
                aria-label="theme-button-dark"
              />
            )}
          </EuiFlexItem> */}
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            <EuiButton style={{background: "white"}} onClick={logout}><EuiImage src={lgout} alt="logo" size="50px" /></EuiButton>
            {/* <EuiButtonIcon
              onClick={logout}
              iconType="exit"
              display="fill"
              size="m"
              aria-label="logout-button"
              style={{ background: "#D81B60" }}
            /> */}
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];

  const responsiveSection = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 0.5vw"}}>
               <EuiImage src={meeticon} alt="logo" size="90px" />
               <span className="custom" style={{ bottom: "33px" }}>FaceHood</span>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: "2vw" }}
        >
          {/* <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            {isDarkTheme ? (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="sun"
                display="fill"
                size="s"
                color="warning"
                aria-label="theme-button-light"
              />
            ) : (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="moon"
                display="fill"
                size="s"
                color="ghost"
                aria-label="theme-button-dark"
              />
            )}
          </EuiFlexItem> */}
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
          <EuiButton style={{background: "white"}} onClick={logout}><EuiImage src={lgout} alt="logo" size="50px" /></EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];
  // setIsResponsive(true);
  useEffect(() => {
    if (window.innerWidth < 480) {
      // sectionSpliced.splice(1, 1);
      // setSection(sectionSpliced);
      setIsResponsive(true);
    }
  }, []);

  return (
    <>
      <EuiHeader
        style={{ minHeight: "15vh", overflow: "auto"}}
        sections={isResponsive ? responsiveSection : section}
      />
      {/* <EuiHeader
        style={{ minHeight: "8vh" }}
        sections={[
          {
            breadcrumbs: breadCrumbs,
          },
        ]}
      /> */}
    </>
  );
}
