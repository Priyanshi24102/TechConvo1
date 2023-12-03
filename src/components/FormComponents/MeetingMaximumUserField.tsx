import { EuiFieldNumber, EuiFormRow } from '@elastic/eui';
import React from "react";

export default function MeetingMaximumUserField({
    value,
    setValue,
}:{
    value:number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <EuiFormRow label="Maximum People">
        <EuiFieldNumber
            placeholder='Maximum People'
            min={1}
            max={50}
            value={value}
            onChange={(e)=> {

                if(!e.target.value.length || parseInt(e.target.value)===0) setValue(1);
                else if(+e.target.value>50)setValue(50);
                else setValue(parseInt(e.target.value));
            }}
        />
    </EuiFormRow>
  )
};
