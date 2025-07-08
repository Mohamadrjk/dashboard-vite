import { useMutation } from '@tanstack/react-query'
import { UploadFile } from 'antd';
import axios from 'axios'
import { useState } from 'react';
const baseUrl = "https://api.imagekit.io/"
const privateKey = "private_XVIdsR3GBwZz87sptIRaMQkIRnQ="
type UploadPayload = { file: File; fileName: string };
const uploadFile = async (payload: UploadPayload) => {
    console.log(privateKey);

    return await axios.postForm("https://api.imagekit.io/api/v2/files/upload", {
        ...payload,
        folder: "club-images"
    }, {
        auth: {
            username: privateKey,
            password: privateKey
        }
    })
}
const deleteFile = async (payload: {
    fileId: string
}) => {
    return await axios.delete(baseUrl + "v1/files/" + payload.fileId, {
        auth: {
            username: privateKey,
            password: ""
        }
    })
}
interface IFileUpload {
    "fileId": string,
    "name": string,
    "size": number,
    "filePath": string,
    "url": string,
    "fileType": string,
    "height": number,
    "width": number,
    "thumbnailUrl": string,
}
function useThirdPartyUplaoder() {
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
    const [fileInfo, setFileInfo] = useState<IFileUpload>()
    const { mutate: onUpload } = useMutation({
        mutationFn: (payload: UploadPayload) => uploadFile(payload),
        onSuccess(data) {
            setFileInfo(data.data)
        },
    })
    const { mutate: onDelete } = useMutation({
        mutationFn: () => fileInfo && deleteFile({ fileId: fileInfo.fileId }),
        onSuccess(data) {
            console.log(data);
        },
    })
    return {
        onUpload,
        onDelete,
        fileList,
        setFileList,
        setFileInfo
    }
}

export default useThirdPartyUplaoder