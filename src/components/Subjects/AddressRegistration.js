import React, { useState, useEffect } from "react";
import { Divider } from "antd";

import useSubjects from "../../stores/Cabinet/useSubjects";
import AddressInput from "../FormComponents/AddressInput"; 
import AddressRegistrationJson from "./AddressRegistration.json";

export default function AddressRegistration({ form, read, edit, value }) {
  const { addressOptions, setSearchText, debouncedFetchAddresses } = useSubjects();

  useEffect(() => {
    debouncedFetchAddresses("");
  }, [debouncedFetchAddresses]);

  return (
    <>
      <Divider orientation="center">Место регистрации</Divider>
      <AddressInput
        form={form}
        read={read}
        edit={edit}
        value={value}
        fieldName="addressRegistration" 
        manualValue={value?.manual}
        addressOptions={addressOptions} 
        debouncedFetchAddresses={debouncedFetchAddresses}
        setSearchText={setSearchText}
        manualInputFields={AddressRegistrationJson} 
      />
    </>
  );
}