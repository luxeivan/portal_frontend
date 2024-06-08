import { Modal } from 'antd'
import React, { useEffect } from 'react'
import useDocuments from '../../../stores/Cabinet/useDocuments'

export default function ModalViewDocument() {
    const openModalView = useDocuments(state => state.openModalView)
    const setOpenModalView = useDocuments(state => state.setOpenModalView)
    const fetchDocument = useDocuments(state => state.fetchDocument)
    const document = useDocuments(state => state.document)
    useEffect(()=>{
        fetchDocument(openModalView)
    },[])
    console.log(openModalView)
    return (
        <Modal
            open={openModalView}
            title="Документ"
            onCancel={() => setOpenModalView()}
            footer={null}
        >
            123
        </Modal>
    )
}
