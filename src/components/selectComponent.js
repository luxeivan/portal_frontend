import AddressInput from "./FormComponentsNew/addressComponents/AddressInput";
import BikInput from "./FormComponentsNew/BikInput";
import CommentInput from "./FormComponentsNew/CommentInput";
import ConfirmationDocumentNewInput from "./FormComponentsNew/confirmationDocumentComponents/ConfirmationDocumentNewInput";
import DateInput from "./FormComponentsNew/DateInput";
import DividerForm from "./FormComponentsNew/DividerForm";
import DocumentInput from "./FormComponentsNew/DocumentInput";
import FormulaInput from "./FormComponentsNew/FormulaInput";
import GroupInput from "./FormComponentsNew/GroupInput";
import HiddenInput from "./FormComponentsNew/HiddenInput";
import InnInput from "./FormComponentsNew/InnInput";
import NumberInput from "./FormComponentsNew/NumberInput";
import PhoneInput from "./FormComponentsNew/phoneComponent/PhoneInput";
import PriceInput from "./FormComponentsNew/PriceInput";
import SelectInput from "./FormComponentsNew/SelectInput";
import SliderInput from "./FormComponentsNew/SliderInput";
import SnilsInput from "./FormComponentsNew/SnilsInput";
import SwitchInput from "./FormComponentsNew/SwitchInput";
import TableInput from "./FormComponentsNew/TableInput";
import TextConcatenation from "./FormComponentsNew/TextConcatenation";
import TextInput from "./FormComponentsNew/TextInput";

export default function selectComponent(item, index) {
  if (item.component?.Ref_Type?.includes("Divider"))
    return <DividerForm key={index} {...item.component} label={item.label} />;
  if (
    item.component?.Ref_Type?.includes("TextInput") &&
    item.component?.specialField === "Телефон"
  )
    return (
      <PhoneInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );
  if (
    item.component?.Ref_Type?.includes("TextInput") &&
    item.component?.specialField === "ИНН"
  )
    return (
      <InnInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );
  if (
    item.component?.Ref_Type?.includes("TextInput") &&
    item.component?.specialField === "БИК"
  )
    return (
      <BikInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );
  if (
    item.component?.Ref_Type?.includes("TextInput") &&
    item.component?.specialField === "Комментарий"
  )
    return (
      <CommentInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );

  if (item.component?.Ref_Type?.includes("TextInput"))
    return (
      <TextInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );
  if (
    item.component?.Ref_Type?.includes("TextInput") &&
    item.component.specialField === "СНИЛС"
  )
    return (
      <SnilsInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );

  if (item.component?.Ref_Type?.includes("NumberInput"))
    return (
      <NumberInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );

  if (item.component?.Ref_Type?.includes("SliderInput"))
    return (
      <SliderInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );

  if (
    item.component?.Ref_Type?.includes("LinkInput") ||
    item.component?.Ref_Type?.includes("EnumInput") ||
    item.component?.Ref_Type?.includes("SelectInput")
  )
    return (
      <SelectInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );

  if (item.component?.Ref_Type?.includes("TableInput"))
    return (
      <TableInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );

  if (item.component?.Ref_Type?.includes("DateInput"))
    return (
      <DateInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );

  if (item.component?.Ref_Type?.includes("SwitchInput"))
    return (
      <SwitchInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );
  if (item.component?.Ref_Type?.includes("AddressInput"))
    return (
      <AddressInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );

  if (item.component?.Ref_Type?.includes("ConfirmationDocumentNewInput"))
    return (
      <ConfirmationDocumentNewInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );

  if (item.component?.Ref_Type?.includes("GroupFieldsInput"))
    return (
      <GroupInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );
  if (item.component?.Ref_Type?.includes("PriceInput"))
    return (
      <PriceInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );
  if (item.component?.Ref_Type?.includes("componentsFormula"))
    return (
      <FormulaInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );
  if (item.component?.Ref_Type?.includes("TextConcatenation"))
    return (
      <TextConcatenation
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );
  if (item.component?.Ref_Type?.includes("FileInput"))
    return (
      <DocumentInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );
  if (item.component?.Ref_Type?.includes("HiddenInput"))
    return (
      <HiddenInput
        key={index}
        {...item.component}
        {...item}
        fullDescription={item.name?.fullDescription}
        name={item.idLine}
        dependOf={item.dependIdLine}
        howDepend={item.dependСondition}
      />
    );
}
