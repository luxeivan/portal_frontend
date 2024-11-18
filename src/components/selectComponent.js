import AddressInput from "./FormComponentsNew/addressComponents/AddressInput";
import BikInput from "./FormComponentsNew/BikInput";
import ConfirmationDocumentNewInput from "./FormComponentsNew/confirmationDocumentComponents/ConfirmationDocumentNewInput";
import DateInput from "./FormComponentsNew/DateInput";
import DividerForm from "./FormComponentsNew/DividerForm";
import DocumentInput from "./FormComponentsNew/DocumentInput";
import FormulaInput from "./FormComponentsNew/FormulaInput";
import GroupInput from "./FormComponentsNew/GroupInput";
import InnInput from "./FormComponentsNew/InnInput";
import NumberInput from "./FormComponentsNew/NumberInput";
import PhoneInput from "./FormComponentsNew/phoneComponent/PhoneInput";
import PriceInput from "./FormComponentsNew/PriceInput";
import SelectInput from "./FormComponentsNew/SelectInput";
import SliderInput from "./FormComponentsNew/SliderInput";
import SnilsInput from "./FormComponentsNew/SnilsInput";
import SwitchInput from "./FormComponentsNew/SwitchInput";
import TableInput from "./FormComponentsNew/TableInput";
import TableInputNew from "./FormComponentsNew/TableInputNew";
import TextConcatenation from "./FormComponentsNew/TextConcatenation";
import TextInput from "./FormComponentsNew/TextInput";

export const selectComponent = (item, index) => {
    if (item.component_Type.includes("Divider"))
      return (
        <DividerForm
          key={index}
          {...item.component_Expanded}
          label={item.label}
        />
      );
      if (item.component_Type.includes("TextInput") && item.component_Expanded?.specialField === 'Телефон')

        return (
          <PhoneInput
            key={index}
            {...item.component_Expanded}
            {...item}
            name={item.idLine}
            dependOf={item.dependIdLine}
            howDepend={item.dependСondition}
          />
        );
    if (item.component_Type.includes("TextInput") && item.component_Expanded?.specialField === 'ИНН')

      return (
        <InnInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );
    if (item.component_Type.includes("TextInput") && item.component_Expanded?.specialField === 'БИК')

      return (
        <BikInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );

    if (item.component_Type.includes("TextInput"))
      return (
        <TextInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );
    if (
      item.component_Type.includes("TextInput") &&
      item.component_Expanded.specialField === "СНИЛС"
    )
      return (
        <SnilsInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );

    if (item.component_Type.includes("NumberInput"))
      return (
        <NumberInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );

    if (item.component_Type.includes("SliderInput"))
      return (
        <SliderInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );

    if (
      item.component_Type.includes("LinkInput") ||
      item.component_Type.includes("EnumInput") ||
      item.component_Type.includes("SelectInput")
    )
      return (
        <SelectInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );

    // if (item.component_Type.includes("TableInput"))
    //   return (
    //     <TableInputNew
    //       key={index}
    //       {...item.component_Expanded}
    //       {...item}
    //       name={item.idLine}
    //       dependOf={item.dependIdLine}
    //       howDepend={item.dependСondition}
    //     />
    //   );
    if (item.component_Type.includes("TableInput"))
      return (
        <TableInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );

    if (item.component_Type.includes("DateInput"))
      return (
        <DateInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );

    if (item.component_Type.includes("SwitchInput"))
      return (
        <SwitchInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );
    if (item.component_Type.includes("AddressInput"))
      return (
        <AddressInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );

    if (
      item.component_Type.includes("ConfirmationDocumentNewInput")
    )
      return (
        <ConfirmationDocumentNewInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );

    if (item.component_Type.includes("GroupFieldsInput"))
      return (
        <GroupInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        //   mainForm={form}
        />
      );
    if (item.component_Type.includes("PriceInput"))
      return (
        <PriceInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );
    if (item.component_Type.includes("componentsFormula"))
      return (
        <FormulaInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );
    if (item.component_Type.includes("TextConcatenation"))
      return (
        <TextConcatenation
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );
    if (item.component_Type.includes("FileInput"))
      return (
        <DocumentInput
          key={index}
          {...item.component_Expanded}
          {...item}
          name={item.idLine}
          dependOf={item.dependIdLine}
          howDepend={item.dependСondition}
        />
      );
  }