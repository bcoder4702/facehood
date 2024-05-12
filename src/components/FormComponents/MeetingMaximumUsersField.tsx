import { EuiFieldNumber, EuiFormRow } from "@elastic/eui";
import React from "react";

function MeetingMaximumUsersField({
  value,
  setSize,
}: {
  value: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <EuiFormRow label="Maximum People">
      <EuiFieldNumber
        min={1}
        max={1000}
        placeholder="Maximum People"
        value={value}
        onChange={(e) => {
          if (!e.target.value.length || parseInt(e.target.value) === 0)
            setSize(1);
          else if (parseInt(e.target.value) > 1000) setSize(1000);
          else setSize(parseInt(e.target.value));
        }}
      />
    </EuiFormRow>
  );
}

export default MeetingMaximumUsersField;
