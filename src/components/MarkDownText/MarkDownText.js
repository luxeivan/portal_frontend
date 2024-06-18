import React from 'react'
import { Typography } from "antd";
import Markdown from "markdown-to-jsx";
import styles from "./MarkDownText.module.css";

export default function MarkDownText({ children }) {
  if (typeof children !== 'string') {
    return false
  }
  return (
    <Markdown options={{
      overrides: {    
        p:{
          props:{
            className: styles.para
          }
        },    
        h1: {
          component: Typography.Title,
          props: {
            className: 'foo',
          },
        },
        table: {
          props: {
            className: `${styles.tableDescription} ${styles.table}`,
          },
        },
      },
    }}>{children}</Markdown>
  )
}
