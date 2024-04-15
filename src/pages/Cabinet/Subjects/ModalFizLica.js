import React, { useState, useEffect } from "react";
import useSubjects from "../../../stores/Cabinet/useSubjects";
import NewForm from "../../../components/Subjects/NewForm";
import fields from "./FormFizLica.json";

export default function ModalFizLica({
  onSubmit,
  setShowModal,
  read = false,
  value = {},
}) {
  const [searchText] = useState("");
  // const { submitNewSubject, debouncedFetchAddresses } = useSubjects();

  // useEffect(() => {
  //   debouncedFetchAddresses(searchText);
  // }, [searchText, debouncedFetchAddresses]);

  return (
    <NewForm
      fields={fields}
      read={read}
      setShowModal={setShowModal}
      value={value}
    />
  );
}
