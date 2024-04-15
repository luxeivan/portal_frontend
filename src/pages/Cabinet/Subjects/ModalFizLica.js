import NewForm from "../../../components/Subjects/NewForm";
import fields from "./FormFizLica.json";

export default function ModalFizLica({
  setShowModal,
  read = false,
  value = {},
}) {
  return (
    <NewForm
      fields={fields}
      read={read}
      setShowModal={setShowModal}
      value={value}
    />
  );
}
