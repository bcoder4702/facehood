import React from "react";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
import { useNavigate } from "react-router-dom";
import dashboard1 from "../assets/dashboard1.png";
import dashboard2 from "../assets/dashboard2.png";
import dashboard3 from "../assets/dashboard3.png";
import d1 from "../assets/d1.png";
import d2 from "../assets/d2.jpg";
import d3 from "../assets/d3.png";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

function Dashboard() {
  useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Header />
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          style={{ margin: "5vh 10vw" }}
        >
          <EuiFlexItem>
            <EuiCard
              layout="horizontal"
              icon={<EuiImage src={d1} alt="icon" size="9rem" />}
              onClick={() => navigate("/create")}
              title={`New Meeting`}
              display="transparent"
              description="Create a new Meet"
            />

            {/* <EuiCard
              icon={<EuiImage src={dashboard1} alt="icon" size="5rem" />}
              title={`Create Meeting`}
              description="Create a new meeting and invite people."
              onClick={() => navigate("/create")}
              paddingSize="xl"
            /> */}
          </EuiFlexItem>
          <EuiFlexItem>
          <EuiCard
              layout="horizontal"
              icon={<EuiImage src={d2} alt="icon" size="10rem" />}
              onClick={() => navigate("/mymeetings")}
              title={`My Meetings`}
              display="transparent"
              description="Track Your Meetings."
            />

            {/* <EuiCard
              icon={<EuiImage src={dashboard2} alt="icon" size="100%" />}
              title={`My Meetings`}
              description="View your created meetings."
              onClick={() => navigate("/mymeetings")}
              paddingSize="xl"
            /> */}
          </EuiFlexItem>
          <EuiFlexItem>
          <EuiCard
              layout="horizontal"
              icon={<EuiImage src={d3} alt="icon" size="10rem" />}
              onClick={() => navigate("/meetings")}
              title={`Meetings`}
              display="transparent"
              description="Track All Meetings."
            />
{/* 
            <EuiCard
              icon={<EuiImage src={dashboard3} alt="icon" size="5rem" />}
              title={`Meetings`}
              description="View the meetings that you are invited to."
              onClick={() => navigate("/meetings")}
              paddingSize="xl"
            /> */}
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
}

export default Dashboard;
