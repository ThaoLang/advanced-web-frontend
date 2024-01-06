import CSVExporter from "@/component/excel/CSVExporter";
import { useTranslations } from "next-intl";
import "react-toastify/dist/ReactToastify.css";

interface ExportProps {
  //
  title: string,
  data: any,
  closeModal: () => void;
}

export default function ExportModal(props: ExportProps) {
  return (
    <div className="flex flex-row m-10 align-middle justify-center">
      <div className="flex flex-col gap-4 w-md">
        <p className="text-lg ml-4 text-center uppercase">
          <b>{props.title}</b>
        </p>
        <CSVExporter data={props.data} filename="exported_data" />
      </div>
    </div>
  );
}
