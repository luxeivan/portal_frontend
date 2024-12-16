import { Button, Col, Collapse, Divider, Image, Row, Tooltip } from 'antd'
import React, { useState, useEffect } from 'react'
import ModalBot from '../Global/ModalBot'
import useGlobal from '../../stores/useGlobal';
import axios from 'axios';
import MarkDownText from "../../components/MarkDownText/MarkDownText";
import mosoblikImage from "../../img/answers/mosoblik.png";
import mosoblikDarkImage from "../../img/answers/mosoblik_dark.png";
import styles from "./QuickAnswers.module.css";

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

export default function QuickAnswers() {
    const [questions, setQuestions] = useState([]);
    const [chatModalVisible, setChatModalVisible] = useState(false);
    const { darkMode } = useGlobal();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${backServer}/api/hotquestions`);
                setQuestions(response.data);
            } catch (error) {
                console.error("Ошибка при получении вопросов/ответов:", error);
            }
        };
        fetchQuestions();
    }, []);


    const items = questions.sort((a, b) => a.question?.localeCompare(b.question)).map((q, index) => ({
        key: index,
        label: q.question,
        children: <MarkDownText>{q.answer}</MarkDownText>,
    }));
    // console.log(questions);

    return (
        <div>
            <Row gutter={[32, 32]} >
                {/* Левая колонка: Вопросы и кнопка */}
                <Col xs={24} md={16}>
                    {questions.filter(item => item.children.length !== 0).sort((a, b) => a.Description && -1).map((section, index) => <div key={index}>

                        <Divider orientation="left">{section.Description ? section.Description : "Прочие вопросы"}</Divider>

                        <Collapse accordion items={section.children.sort((a, b) => a.question?.localeCompare(b.question)).map((q, index) => ({
                            key: index,
                            label: q.question,
                            children: <MarkDownText>{q.answer}</MarkDownText>,
                        }))} />
                    </div>)}
                    {/* <Collapse accordion items={items} /> */}
                </Col>

                {/* Правая колонка: Изображение и Фонарик */}
                <Col xs={24} md={8} className={styles.imageContainer}>
                    <Image
                        src={darkMode ? mosoblikDarkImage : mosoblikImage}
                        alt="Мособлик"
                        style={{ width: "70%", height: "auto" }}
                        preview={false}
                    />
                    <Tooltip title="Не нашли нужный ответ? Задайте вопрос нашему помощнику.">

                        <Button
                            type="primary"
                            onClick={() => setChatModalVisible(true)}
                            style={{ marginTop: "20px" }}
                            size="large"
                            className={styles.btn}
                        >
                            Задать вопрос
                        </Button>
                    </Tooltip>
                    {/* {darkMode && <GiFlashlight className={styles.flashlight} />} */}
                </Col>
            </Row>

            <ModalBot
                visible={chatModalVisible}
                onClose={() => setChatModalVisible(false)}
            />
        </div>
    )
}
