import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import Paragraph from 'antd/es/typography/Paragraph'
import React from 'react'

export default function StrapiRichText({content}) {
    if(content)
    return (
        
        <BlocksRenderer
            blocks={{
                paragraph: ({ children }) => <Paragraph className="text-neutral900 max-w-prose">{children}</Paragraph>,
            }}
            content={content} />
    )
    return false
}
