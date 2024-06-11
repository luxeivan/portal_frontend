import { Modal, Form, Typography } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useSubjects from "../../../stores/Cabinet/useSubjectsS";
import NewForm from "./NewForm";
import fieldsJson from "./ModalFizLica/FormFizLica.json";
const { confirm } = Modal;

export default function ModalSubject({ setShowModal, read = false, value = {}, type }) {
    const subject = useSubjects(store => store.subject)
    const [form] = Form.useForm();
    const deleteSubjectItem = useSubjects((store) => store.deleteSubjectItem);
    const submitNewSubject = useSubjects((store) => store.submitNewSubject);
    const handlerDelete = (id) => {
        confirm({
            title: "Вы уверены что хотите удалить субъект?",
            icon: <ExclamationCircleFilled />,
            okText: "Да",
            okType: "danger",
            cancelText: "Нет",
            onOk() {
                // console.log("del", id);
                setShowModal(false);
                deleteSubjectItem(id);
            },
            onCancel() {
                // console.log("Cancel");
            },
        });
    };
    console.log(read);
    console.log(type);
    const handlerEditFiz = (id) => {
        console.log("Обновить", id);
        console.log(form.getFieldValue());
    }
    const handlerEditYur = (id) => {
        console.log("Обновить", id);
        console.log(form.getFieldValue());
    }
    const handlerEditIp = (id) => {
        console.log("Обновить", id);
        console.log(form.getFieldValue());
    }


    const handlerSubmitFormFiz = (event) => {
        //console.log(event)
        let list = fieldsJson.filter(item => item.type !== "divider")
        const obj = {}
        list.forEach(item => {
            obj[item.name] = event[item.name]
        });
        if (event.matchedWith) {
            obj.addressResidential = obj.addressRegistration
        }
        console.log(obj)
        obj.type = "Физическое лицо"
        //submitNewSubject(obj)
        //setShowModal(false);
    }
    const handlerSubmitFormYur = (event) => { }
    const handlerSubmitFormIp = (event) => { }
    if (type === "fiz" || type === "Физическое лицо")
        return (
            <NewForm
                form={form}
                handlerSubmitForm={handlerSubmitFormFiz}
                handlerDelete={handlerDelete}
                handlerEdit={handlerEditFiz}
                fields={fieldsJson}
                read={read}
                setShowModal={setShowModal}
                value={read ? { ...subject?.attributes?.counterparty[0], id: subject?.id } : false}
            />
        );
    if (type === "yur" || type === "Юридическое лицо")
        return (
            <Typography.Title level={5}>Юрики</Typography.Title>
            // <NewForm
            //     form={form}
            //     handlerSubmitForm={handlerSubmitFormYur}
            //     handlerDelete={handlerDelete}
            //     handlerEdit={handlerEditYur}
            //     fields={fieldsJson}
            //     read={read}
            //     setShowModal={setShowModal}
            //     value={{ ...subject?.attributes?.counterparty[0], id: subject?.id }}
            // />
        );
    if (type === "ip" || type === "Индивидуальный предприниматель")
        return (
            <Typography.Title level={5}>ИП</Typography.Title>
            // <NewForm
            //     form={form}
            //     handlerSubmitForm={handlerSubmitFormIp}
            //     handlerDelete={handlerDelete}
            //     handlerEdit={handlerEditIp}
            //     fields={fieldsJson}
            //     read={read}
            //     setShowModal={setShowModal}
            //     value={{ ...subject?.attributes?.counterparty[0], id: subject?.id }}
            // />
        );
}
