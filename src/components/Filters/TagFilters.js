import React, { useEffect, useState } from 'react'
import { Flex, Tag } from 'antd'
function arrToObj(arr, field) {
    const object = {}
    arr.forEach(filter => {
        if (!object.hasOwnProperty(filter[field])) {
            object[filter[field]] = {}
            object[filter[field]].name = filter.name
            object[filter[field]].value = new Set()
        }
        if (filter.value)
            object[filter[field]].value.add(filter.value)
    })
    return object
}

export default function TagFilters({ array, handlerFilter }) {
    const [listFilters, setListFilter] = useState([])
    const [selectedTags, setSelectedTags] = useState([]);
    let objectFilters = {}
    const handleChange = (tag, checked) => {
        console.log(tag)
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t.value !== tag.value);
        //console.log('Выбрано:', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
        const objectForFilter = arrToObj(nextSelectedTags, 'component')
        const arrayForFilter = Object.entries(objectForFilter).map(item => ({
            component: item[0],
            value: Array.from(item[1].value)
        }))
        console.log(arrayForFilter)
        handlerFilter(arrayForFilter)
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
                    if (filter.value)
                        objectFilters[filter.__component].value.add(filter.value)
                })
                //console.log(objectFilters)
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
