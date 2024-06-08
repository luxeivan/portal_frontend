import { Modal } from 'antd'
import React, { useEffect } from 'react'
import useDocuments from '../../../stores/Cabinet/useDocuments'

export default function ModalViewDocument() {
    const openModalView = useDocuments(state => state.openModalView)
    const setOpenModalView = useDocuments(state => state.setOpenModalView)
    const fetchDocument = useDocuments(state => state.fetchDocument)
    const document = useDocuments(state => state.document)
    useEffect(() => {
        if (openModalView) {
            fetchDocument(openModalView)
        }
    }, [openModalView])
    console.log(document)
    return (
        <Modal
            open={openModalView}
            title="Документ"
            onCancel={() => setOpenModalView()}
            footer={null}
        >
            {document &&
                document.Description
            }
        </Modal>
    )
}
