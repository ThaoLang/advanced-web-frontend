import CSVExporter from "@/component/excel/CSVExporter";
import { useTranslations } from "next-intl";
import "react-toastify/dist/ReactToastify.css";

interface ImportExportProps {
  //
  data: any,
  closeModal: () => void;
}

export default function ImportExportModal(props: ImportExportProps) {
  const t = useTranslations("GradePage");

  return (
    <div className="flex flex-row m-10 align-middle justify-center">
      <div className="flex flex-col gap-4 w-md">
        <p className="text-lg ml-4 text-center uppercase">
          <b>{t("export")}</b>
        </p>
        <CSVExporter data={props.data} filename="exported_data" />
      </div>
    </div>
  );
}
