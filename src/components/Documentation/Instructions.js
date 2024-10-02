import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pdf from "../../img/docs/pdf.svg";
import doc from "../../img/docs/doc.svg";
import docx from "../../img/docs/docx.svg";
import rar from "../../img/docs/rar.svg";
import xls from "../../img/docs/xls.svg";
import rtf from "../../img/docs/rtf.svg";
import axios from "axios";
import styles from './Law.module.css'
import { Typography } from "antd";

const type = {
  pdf,
  doc,
  docx,
  rar,
  xls,
  rtf,
};
const siteMosoblServer = process.env.REACT_APP_BACK_SITE_MOSOBLENERGO_SERVER

export default function Instructions() {
  const [docs, setDocs] = useState([])
  useEffect(() => {
    axios.get(`${siteMosoblServer}/api/tp-normativno-pravovye-akty?populate=*`)
      .then(response => {
        if (response.data) {
          // console.log(response.data.data.attributes.docs.data)
          setDocs(response.data.data.attributes.docs.data)
          // setDocs()
        }
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  return (
    <div className="page-grid__content">
      <div className="row-docs-age">
       
          <Typography.Title level={3}>Политики и регламенты</Typography.Title>
          <a
            className={styles.docLine}
            href={'/#'}
            download=""
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className={styles.docLine__wrapIcon}>
              <img
                src={pdf}
                alt={'PDF'}
              />
            </div>
            <div className="docLine__wrapText">
              <span className={styles.docLine__name}>Политика 1</span>
              <span className={styles.docLine__fileInfo}>1 МБ</span>
            </div>
          </a>
          <a
            className={styles.docLine}
            href={'/#'}
            download=""
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className={styles.docLine__wrapIcon}>
              <img
                src={pdf}
                alt={'PDF'}
              />
            </div>
            <div className="docLine__wrapText">
              <span className={styles.docLine__name}>Политика 2</span>
              <span className={styles.docLine__fileInfo}>2 МБ</span>
            </div>
          </a>
          <Typography.Title level={3}>Руководства пользователя</Typography.Title>
          <a
            className={styles.docLine}
            href={'/#'}
            download=""
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className={styles.docLine__wrapIcon}>
              <img
                src={pdf}
                alt={'PDF'}
              />
            </div>
            <div className="docLine__wrapText">
              <span className={styles.docLine__name}>Руководство пользователя</span>
              <span className={styles.docLine__fileInfo}>567 КБ</span>
            </div>
          </a>
        
      </div>
    </div>
  );
}
