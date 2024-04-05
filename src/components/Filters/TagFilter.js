import { Flex, Tag } from 'antd';
import React, { useState, useEffect } from 'react'

export default function TagFilter({ array, handlerFilter }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
        // console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
        handlerFilter(nextSelectedTags)
    };
    useEffect(() => {
        const arrSet = new Set();
        array.forEach(element => {
            arrSet.add(element)
        });
        setTagsData([...arrSet])
        //console.log(tagsData)
    }, [array])
    const [tagsData, setTagsData] = useState([])
    return (

        <Flex style={{marginBottom: "20px"}}  gap={4} wrap="wrap" align="center">
            {/* <span>Мощность:</span> */}
            {Array.from(tagsData).map((tag) => (
                <Tag.CheckableTag
                    color="red"
                    key={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={(checked) => handleChange(tag, checked)}
                >
                    {tag}
                </Tag.CheckableTag>
            ))}
        </Flex>
    )
}
