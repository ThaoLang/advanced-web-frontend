import axios from 'axios';
import React, { useState } from 'react';
import { saveAs } from 'file-saver'
import { FaFileExport } from 'react-icons/fa6';

interface FileDownloadButtonProps {
    filename: string,
    templateCategory: string,
}

//Download template csv/xlsx file
export default function FileDownloadButton(props: FileDownloadButtonProps) {

    const [fileType, setFileType] = useState('csv');

    const categorySwitcher = (category: string) => {
        switch (category) {
            case 'ClassList':
                return {
                    csv: `${process.env.NEXT_PUBLIC_CLASS_LIST_TEMPLATE_CSV}`,
                    xlsx: `${process.env.NEXT_PUBLIC_CLASS_LIST_TEMPLATE_XLSX}`,
                };
            case 'Grade':
                return {
                    csv: `${process.env.NEXT_PUBLIC_GRADE_TEMPLATE_CSV}`,
                    xlsx: `${process.env.NEXT_PUBLIC_GRADE_TEMPLATE_XLSX}`,
                };
            default:
                return {
                    csv: '',
                    xlsx: '',
                };
        }
    };

    const fileExtensionSwitcher = (files: any, extension: string) => {
        return files[extension];
    }

    const handleDownload = async () => {
        const files = categorySwitcher(props.templateCategory);
        const templateFileUrl = fileExtensionSwitcher(files, fileType);
        let encodedValue = encodeURIComponent(templateFileUrl);

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}download/${encodedValue}`,
                {
                    responseType: 'blob'
                });

            if (response.status !== 200) {
                console.error('Failed to download file');
                return;
            }

            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            saveAs(blob, `${props.filename}.${fileType}`)
        }
        catch (error) {
            console.error('Error downloading file:', error);
        }

    };

    return (
        <label className="form-control w-full max-w-xs flex flex-row space-x-5 justify-between lg:ml-5">
            {/* <div className="label">
                <span className="label-text">Save template</span>
            </div> */}

            <select className="select select-bordered" value={fileType} onChange={(e) => setFileType(e.target.value)}>
                <option value="csv">CSV</option>
                <option value="xlsx">Excel (XLSX)</option>
            </select>
            <div>
                <button className="text-white btn btn-info bg-blue-500 text-white"
                    onClick={handleDownload}>
                    <span>DOWNLOAD</span>
                </button>
            </div>
        </label>
    );
};
