import { EuiComboBox, EuiFormRow } from '@elastic/eui'
import React from 'react'

function MeetingUsersFields({label,options,onChange,selectedOptions,isClearable,placeholder,singleSelection=false,isInvalid,error}:
    {label:string;
        options:any;
        onChange:any;
        selectedOptions:any;
        isClearable:boolean;
        placeholder:string;
        singleSelection:any;
        isInvalid:boolean;
    error: Array<string>;
    }) {
  return (
    <EuiFormRow label={label} isInvalid={isInvalid} error={error}>
        <EuiComboBox options={options} onChange={onChange} selectedOptions={selectedOptions} singleSelection={singleSelection} placeholder={placeholder} isClearable={isClearable} isInvalid={isInvalid}> 

        </EuiComboBox>
    </EuiFormRow>
  )
}

export default MeetingUsersFields
