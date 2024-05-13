import React from "react";
import { Typography } from "antd";

const { Paragraph, Title } = Typography;

export default function StrapiRichText({ content }) {
  if (typeof content === "string") {
    return <Paragraph>{content}</Paragraph>;
  }

  if (
    Array.isArray(content) &&
    content.every((item) => typeof item === "string")
  ) {
    return (
      <>
        {content.map((text, index) => (
          <Paragraph key={index}>{text}</Paragraph>
        ))}
      </>
    );
  }

  if (Array.isArray(content)) {
    return (
      <>
        {content.map((block, index) => {
          switch (block.type) {
            case "paragraph":
              return <Paragraph key={index}>{block.content}</Paragraph>;
            case "header":
              return (
                <Title key={index} level={block.level || 2}>
                  {block.content}
                </Title>
              );
            default:
              return null; // Для неизвестных типов блоков не отображаем ничего
          }
        })}
      </>
    );
  }

  return null;
}