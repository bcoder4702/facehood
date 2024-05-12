import { EuiButton, EuiFlexGroup, EuiForm, EuiSpacer } from "@elastic/eui";
import { addDoc } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons";
import MeetingDateField from "../components/FormComponents/MeetingDateField";
import MeetingNameField from "../components/FormComponents/MeetingNameFIeld";
import MeetingUserField from "../components/FormComponents/MeetingUserField";

import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import useFetchUsers from "../hooks/useFetchUsers";
import useToast from "../hooks/useToast";
import { meetingsRef } from "../utils/firebaseConfig";
import { generateMeetingID } from "../utils/generateMeetingId";
import { FieldErrorType, UserType } from "../utils/types";
// import SearchField from "../components/FormComponents/SearchField";
// import useFetchSelectedUser from "../hooks/useFetchSelectedUser";

export default function OneOnOneMeeting() {
  useAuth();
  const [users] = useFetchUsers();
  const [createToast] = useToast();
  const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
  const navigate = useNavigate();

  const [meetingName, setMeetingName] = useState("");
  const [selectedUser, setSelectedUser] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment());
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });

  const onUserChange = (selectedOptions: Array<UserType>) => {
    setSelectedUser(selectedOptions);
  };

  const validateForm = () => {
    const showErrorsClone = { ...showErrors };
    let errors = false;
    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      showErrorsClone.meetingName.show = false;
      showErrorsClone.meetingName.message = [];
    }
    if (!selectedUser.length) {
      showErrorsClone.meetingUser.show = true;
      showErrorsClone.meetingUser.message = ["Please Select a User"];
      errors = true;
    } else {
      showErrorsClone.meetingUser.show = false;
      showErrorsClone.meetingUser.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  };

  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingsRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: "personal",
        invitedUsers: [selectedUser[0].uid],
        meetingDate: startDate.format("L"),
        maxUsers: 1,
        status: true,
      });
      createToast({
        title: "Created Successfully",
        type: "success",
      });
      navigate("/");
    }
  };
 const [value, setValue] = React.useState('');
 const [isClearable, setIsClearable] = React.useState(true);
 const onChange = (e: any) => {
    setValue(e.target.value);
    // console.log(value)
    setIsClearable(value.length > 0);
  }
  // const [selectedUsers]= useFetchSelectedUser(value);
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <MeetingNameField
            label="Meeting name"
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
          />
          {/* <SearchField 
             label="Search User"
             value={value}
             onChange={(e: any) => onChange(e)}
             isClearable={isClearable}
             options={}
          /> */}
          <MeetingUserField
            label="Invite User"
            isInvalid={showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUser}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a User"
          />
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}
