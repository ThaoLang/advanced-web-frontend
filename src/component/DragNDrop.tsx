import { useTranslations } from "next-intl";
import React from "react";
import { useDropzone } from "react-dropzone";

interface ImageProp {
  saveImageUrl: (imageUrl: any) => void;
  saveRawImage: (image: any) => void;
}

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  cursor: "pointer",
  outerWidth: "40px",
};

function DragNDrop(props: ImageProp) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    onDrop: (acceptedFiles) => {
        props.saveRawImage(acceptedFiles[0]);
        const fileUrl = URL.createObjectURL(acceptedFiles[0]);
        props.saveImageUrl(fileUrl);
      }
  });
  const t = useTranslations("Profile");

  return (
    <div>
  <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-center">{t("dropping")}</p>
        ) : (
          <p className="text-center">{t("drop_area")}</p>
        )}
      </div>
    </div>
  );
}

export default DragNDrop;
