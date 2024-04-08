import React, { useEffect, useState } from 'react'
import { Flex, Tag } from 'antd'

export default function TagFilters({ array, handlerFilter }) {
    const [listFilters, setListFilter] = useState([])
    const [selectedTags, setSelectedTags] = useState([]);
    const objectFilters = {}
    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t.value !== tag.value);
        //console.log('Выбрано:', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
        const objectForFilter = {}
        nextSelectedTags.forEach(filter => {
            if (!objectForFilter.hasOwnProperty(filter.component)) {
                objectForFilter[filter.component] = {}
                objectForFilter[filter.component].value = new Set()
            }
            if (filter.value)
                objectForFilter[filter.component].value.add(filter.value)
        })
        //console.log('objectForFilter:', objectForFilter);
        handlerFilter(Object.entries(objectForFilter).map(item => ({
            component: item[0],
            value: Array.from(item[1].value)
        })))
    };
    useEffect(() => {
        array.forEach(service => {
            if (service.attributes.filters) {
                service.attributes.filters.forEach(filter => {
                    if (!objectFilters.hasOwnProperty(filter.__component)) {
                        //console.log(filter.__component)
                        objectFilters[filter.__component] = {}
                        objectFilters[filter.__component].name = filter.name
                        objectFilters[filter.__component].value = new Set()
                    }
                    //console.log(objectFilters)
                    if (filter.value)
                        objectFilters[filter.__component].value.add(filter.value)
                })
            }
        });
        setListFilter(Object.entries(objectFilters).map(item => ({
            component: item[0],
            name: item[1].name,
            value: Array.from(item[1].value)
        })))
    }, [array])
    return (
        <>
            {listFilters.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }).map((item, index) =>
                <Flex key={index} style={{ marginBottom: "5px" }} gap={1} wrap="wrap" align="center">
                    <span style={{ fontWeight: 700 }}>{item.name}:</span>
                    {item.value.map((tag) => (
                        <Tag.CheckableTag
                            style={{ padding: "5px 10px" }}
                            key={tag}
                            checked={selectedTags.find(item => item.value === tag)}
                            onChange={(checked) => handleChange({ component: item.component, value: tag }, checked)}
                        >
                            {tag}
                        </Tag.CheckableTag>
                    ))}
                </Flex>)}

        </>
    )
}
