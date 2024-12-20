import React, { useState, useEffect } from "react";
import AppHelmet from "../../components/Global/AppHelmet";
import { Typography, Button, Form, Flex } from "antd";
import TweenOne from "rc-tween-one";
import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";
import { additionalInfoText, mainParagraphText } from "./textConstants";
import { prepareDataSource } from "./helpers";
import useCalc from "../../stores/useCalc";
import styles from "./Calc.module.css";
import lawStyles from "../../components/Documentation/Law.module.css"; // Импортируем стили для документов
import { formItemLayoutForCalc } from "../../components/configSizeForm";
import CalcTable from "./CalcTable";
import pdf from "../../../src/img/pdf.svg";
import Container from "../../components/Container";
import MobileCalcView from "./MobileCalcView";

TweenOne.plugins.push(Children);

const { Title, Paragraph } = Typography;

const formItemLayout = formItemLayoutForCalc;

export default function Calc1() {
    const [form] = Form.useForm();
    const [isCalculateButtonDisabled, setIsCalculateButtonDisabled] = useState(false);
    const { totalPower, animation, calculatedData, handleFinish, showAdditionalInfo, generatePDF } = useCalc();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 769);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        form.setFieldsValue(calculatedData);
    }, [calculatedData]);

    const onValuesChange = () => {
        setIsCalculateButtonDisabled(false);
    };

    const dataSource = prepareDataSource();

    const handleFinishWithLock = (values) => {
        setIsCalculateButtonDisabled(true);
        handleFinish(values);
    };

    return (
        <Container>
            <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
            {isMobile ?                 <MobileCalcView />             :                 <>
                    <Title level={2}>Калькулятор оценочного расчета электрической мощности</Title>
                    <Paragraph>
                        Калькулятор мощности позволяет оценить совокупную мощность электрооборудования индивидуального домохозяйства (объекта с бытовым характером нагрузки), необходимую для технологического присоединения к электросети АО `Мособлэнерго`.
                    </Paragraph>
                    <Paragraph>
                        <b>Для заявителей - физических лиц. Только для некоммерческого применения</b>.
                    </Paragraph>
                    <Paragraph>
                        {mainParagraphText}
                    </Paragraph>
                    <Form form={form} onFinish={handleFinishWithLock} onValuesChange={onValuesChange} {...formItemLayout} labelWrap style={{ maxWidth: 'none' }}>
                        <CalcTable dataSource={dataSource} calculatedData={calculatedData} onValuesChange={onValuesChange} />
                        <Form.Item className={styles.buttonContainer}>
                            <Flex gap={10}>
                                <Button type="primary" htmlType="submit" disabled={isCalculateButtonDisabled}>
                                    Рассчитать
                                </Button>
                                <Button type="default" onClick={() => generatePDF(dataSource, totalPower)} disabled={!showAdditionalInfo}>
                                    Выгрузить PDF
                                </Button>
                            </Flex>
                        </Form.Item>
                    </Form>
                    <Title level={4} style={{ textAlign: "center" }}>Итого требуемая электрическая мощность (оценочно) в кВт:{" "}
                        <TweenOne animation={animation} style={{ fontSize: 24, display: "inline-block" }}>
                            <span>{totalPower !== "0" ? totalPower : "0"}</span>
                        </TweenOne>
                        <sup>*</sup>
                    </Title>
                    <Paragraph>
                        {additionalInfoText}
                    </Paragraph>
                    <Paragraph>
                        <sup>*</sup> Для точного расчета необходимой мощности, рекомендуем обратиться в специализированные проектные организации.
                    </Paragraph>
                    <Title level={4}>Нормативные документы:</Title>
                    <div className={lawStyles.rowDocsAge}>
                        <a className={lawStyles.docLine} href={require("./LegalActs/1.pdf")} download>
                            <div className={lawStyles.docLine__wrapIcon}>
                                <img src={pdf} alt="PDF" />
                            </div>
                            <div className={lawStyles.docLine__wrapText}>
                                <span className={lawStyles.docLine__name}>Инструкция по проектированию городских электрических сетей. РД 34.20.185-94 (утв. Минтопэнерго России 07.07.1994, РАО "ЕЭС России" 31.05.1994) (с изм. от 29.06.1999)</span>
                            </div>
                        </a>
                        <a className={lawStyles.docLine} href={require("./LegalActs/2.pdf")} download>
                            <div className={lawStyles.docLine__wrapIcon}>
                                <img src={pdf} alt="PDF" />
                            </div>
                            <div className={lawStyles.docLine__wrapText}>
                                <span className={lawStyles.docLine__name}>СП 256.1325800.2016. Свод правил. Электроустановки жилых и общественных зданий. Правила проектирования и монтажа (утв. Приказом Минстроя России от 29.08.2016 N 602/пр) (ред. от 28.12.2023)</span>
                            </div>
                        </a>
                        <a className={lawStyles.docLine} href={require("./LegalActs/3.pdf")} download>
                            <div className={lawStyles.docLine__wrapIcon}>
                                <img src={pdf} alt="PDF" />
                            </div>
                            <div className={lawStyles.docLine__wrapText}>
                                <span className={lawStyles.docLine__name}>СП 31-110-2003. Свод правил по проектированию и строительству. Проектирование и монтаж электроустановок жилых и общественных зданий (одобрен и рекомендован к применению Постановлением Госстроя РФ от 26.10.2003 N 194)</span>
                            </div>
                        </a>
                    </div>
                </>}
        </Container>
    );
}
