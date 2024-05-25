import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const props = {

    name: 'file',
    action: 'http://localhost:3000/dev/products',
    headers: {
        authorization: 'authorization-text',
    },

    onChange(info) {

        if (info.file.status !== 200) {
            console.log(info.file, info.fileList);
        }

        if (info.file.status === 200) {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },

};

const UploadImage = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click para subir imagen</Button>
  </Upload>
);

export default UploadImage;