import React, { useEffect,useState,useCallback } from "react";
import { Form, Card, Button, Tag, theme, Flex } from "antd";
import axios from "axios";
import { FileTextOutlined, EyeOutlined } from "@ant-design/icons";
import DocumentSelectModal from "./DocumentSelectModal";

export default function DocumentInput({
    name = "name",
    label = "Label",
    disabled = false,
    placeholder = "placeholder",
    required = false,
    dependOf = false,
    howDepend = false,
    defaultValue = false,
    length = false,
    category_Key = null
}) {
    const [documentModalVisible, setDocumentModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { token } = theme.useToken();

    const form = Form.useFormInstance();
    // let fieldDepends = Form.useWatch(dependOf, form);

    const handlerSelectDocument = (categoryKey) => {

        setSelectedCategory(categoryKey);
        setDocumentModalVisible(true);
    };


    const handlerDocumentSelected = (document) => {

        console.log(
            `Пользователь выбрал документ для категории ${selectedCategory}:`,
            document
        );

        form.setFieldValue(`document_${selectedCategory}`, document );

        setDocumentModalVisible(false);
    };

    // Функция для открытия документа в новой вкладке
    const openDocument = useCallback((document) => {
        const backServer = process.env.REACT_APP_BACK_BACK_SERVER;
        const newWindow = window.open("", "_blank");
        let fileUrl;

        if (document.ПутьКФайлу) {
            const fileName = document.ПутьКФайлу.split("/")[1];
            fileUrl = `${backServer}/api/cabinet/get-file/by-filename/${fileName}`;
        } else {
            const fileId = document.Ref_Key;
            fileUrl = `${backServer}/api/cabinet/get-file/by-id/${fileId}`;
        }

        axios
            .get(fileUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
                responseType: "blob",
                withCredentials: true,
            })
            .then((response) => {
                const file = new Blob([response.data], { type: "application/pdf" });
                const fileURL = URL.createObjectURL(file);
                newWindow.location.href = fileURL;
            })
            .catch((error) => {
                console.error("Ошибка при открытии документа:", error);
                newWindow.document.write("<p>Не удалось загрузить документ.</p>");
            });
    }, []);

    const attachedDocument = form.getFieldValue(
        `document_${category_Key}`
      );
      const isAttached = !!attachedDocument;

    const formElement = (
        <>
            <Form.Item
                name={name}

                rules={[
                    {
                        required: required,
                        message: "Это поле обязательное",
                    },
                ]}
            >
                <Card
                    bordered
                    style={{
                        // margin:10,
                        height: 200,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "8px",
                        backgroundColor: isAttached
                            ? token.colorSuccessBg
                            : token.colorBgContainer,
                    }}
                >
                    {/* Иконка глаза в верхнем правом углу */}
                    {isAttached && (
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EyeOutlined />}
                            size="small"
                            style={{ position: "absolute", top: 10, right: 10 }}
                            onClick={() => openDocument(attachedDocument)}
                        />
                    )}

                    {/* Верхняя часть карточки */}
                    <div style={{ flex: 1 }}>
                        {/* Заголовок с иконкой */}
                        <Card.Meta
                            avatar={
                                <FileTextOutlined
                                    style={{
                                        fontSize: "24px",
                                        color: token.colorPrimary,
                                    }}
                                />
                            }
                            title={
                                <div style={{ whiteSpace: "normal" }}>
                                    {label}
                                </div>
                            }
                            // description={item.shortDescription || ""}
                            style={{ marginBottom: 16 }}
                        />
                        {/* Отображение названия выбранного документа */}
                        {isAttached && (
                            <div style={{ marginBottom: 16 }}>

                                <strong>Документ:</strong> {attachedDocument.label}

                            </div>
                        )}
                    </div>
                    {/* Нижняя часть карточки с плашкой и кнопкой */}
                    <Flex vertical gap={10} align="center" justify="center">
                        {isAttached ? (
                            <Tag color="success" >
                                Прикреплено
                            </Tag>
                        ) : (
                            <Tag color="error">
                                Не прикреплено
                            </Tag>
                        )}
                        <Button
                            type="primary"

                            onClick={() => handlerSelectDocument(category_Key)}

                        >
                            {isAttached ? "Изменить" : "Выбрать"}
                        </Button>
                    </Flex>
                </Card>
            </Form.Item>
            <DocumentSelectModal
                visible={documentModalVisible}
                onClose={() => setDocumentModalVisible(false)}
                categoryKey={selectedCategory}

                onSelectDocument={handlerDocumentSelected}

            />
        </>
    );

    // if (!dependOf) return formElement;

    // if (dependOf && howDepend && howDepend.options?.length > 0) {
    //     let show = false;
    //     if (typeof fieldDepends === "undefined") fieldDepends = false;
    //     howDepend.options.forEach((item) => {
    //         if (item.value === "true") item.value = true;
    //         if (item.value === "false") item.value = false;
    //         if (item.value == fieldDepends) show = true;
    //     });
    //     if (show) return formElement;
    // }

    // if (dependOf && howDepend && howDepend.max) {
    //     if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max)
    //         return formElement;
    // }
    return formElement
}

