import { Flex, Modal, Spin, Typography, Descriptions } from 'antd'
import React, { useEffect } from 'react'
import useDocuments from '../../../stores/Cabinet/useDocuments'

export default function ModalViewDocument() {
    const openModalView = useDocuments(state => state.openModalView)
    const setOpenModalView = useDocuments(state => state.setOpenModalView)
    const loadingDocument = useDocuments(state => state.loadingDocument)
    const fetchDocument = useDocuments(state => state.fetchDocument)
    const nameDocs = useDocuments(state => state.nameDocs)
    const document = useDocuments(state => state.document)
    useEffect(() => {
        if (openModalView) {
            fetchDocument(openModalView)
        }
    }, [openModalView])
    //console.log(document)
    return (
        <Modal
            open={openModalView}
            title="Документ"
            onCancel={() => setOpenModalView()}
            footer={null}
        >
            {loadingDocument && <Flex style={{ width: "100%", height: "100px" }} align='center' justify='center'><div><Spin size='large' /></div></Flex>}
            {!loadingDocument && document.files &&
                <Descriptions title={nameDocs.find(item => item.Ref_Key == document.nameDoc_Key)?.Description}>
                    {document.files.map((item, index) =>
                        <Descriptions.Item key={index} label={`Имя файла №${index+1}`}>{item.fileName}</Descriptions.Item>                        
                    )}
                </Descriptions>
            }

        </Modal>
    )
}
