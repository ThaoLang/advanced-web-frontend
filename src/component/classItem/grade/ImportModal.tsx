import CSVImporter from "@/component/excel/CSVImporter";
import { useTranslations } from "next-intl";
import "react-toastify/dist/ReactToastify.css";

interface ImportProps {
  //
  title: string;
  onFileUpload: (data: any) => void;
  closeModal: () => void;
}

export default function ImportModal(props: ImportProps) {

  return (
    <div className="flex flex-row m-10 align-middle justify-center">
      <div className="flex flex-col gap-4 w-md">
        <p className="text-lg ml-4 text-center uppercase">
          <b>{props.title}</b>
        </p>
        <CSVImporter onFileUpload={props.onFileUpload} />
      </div>
    </div>
  );
}
