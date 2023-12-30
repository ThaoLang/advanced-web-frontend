import axios from 'axios';
import React, { useState } from 'react';
import { saveAs } from 'file-saver'
import { FaFileExport } from 'react-icons/fa6';

interface FileDownloadButtonProps {
    filename: string
}

export default function FileDownloadButton(props: FileDownloadButtonProps) {

    const [fileType, setFileType] = useState('csv');

    const handleDownload = async () => {
        const templateFileUrl_csv = `${process.env.NEXT_PUBLIC_TEMPLATE_CSV}`;
        const templateFileUrl_xlsx = `${process.env.NEXT_PUBLIC_TEMPLATE_XLSX}`;
        let templateFileUrl: string;

        if (fileType === 'csv') templateFileUrl = templateFileUrl_csv;
        else templateFileUrl = templateFileUrl_xlsx;
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
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Save template</span>
            </div>

            <select className="select select-bordered" value={fileType} onChange={(e) => setFileType(e.target.value)}>
                <option value="csv">CSV</option>
                <option value="xlsx">Excel (XLSX)</option>
            </select>
            <div className="label">
                <span className="label-text-alt"></span>
                <button className="label-text-alt btn btn-info text-white flex flex-row"
                    onClick={handleDownload}>
                    <span className="text-white text-xl"><FaFileExport /></span>
                    <span>DOWNLOAD</span>
                </button>
            </div>
        </label>
    );
};
