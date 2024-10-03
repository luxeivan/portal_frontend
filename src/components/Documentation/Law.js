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
import AppHelmet from "../Global/AppHelmet";
const type = {
  pdf,
  doc,
  docx,
  rar,
  xls,
  rtf,
};
const siteMosoblServer = process.env.REACT_APP_BACK_SITE_MOSOBLENERGO_SERVER

export default function Law() {
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
        {docs.length > 0 &&
          docs.sort((a, b) => Number(a.attributes.caption) - Number(b.attributes.caption)).map((item, index) =>
            <a
              key={index}
              className={styles.docLine}
              href={`${siteMosoblServer}${item.attributes.url}`}
              download=""
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={styles.docLine__wrapIcon}>
                <img
                  src={type[item.attributes.ext.slice(1)]}
                  alt={`icon ${item.attributes.ext.slice(1)}`}
                />
              </div>
              <div className="docLine__wrapText">
                <span className={styles.docLine__name}>{item.attributes.name}</span>
                <span className={styles.docLine__fileInfo}>{Number(item.attributes.size) > 1000 ? `${(item.attributes.size / 1000).toFixed(2)} МБ` : `${Math.round(item.attributes.size)} КБ`}</span>
              </div>
            </a>
          )}
      </div>
    </div>
  );
}
