import { useTranslations } from "next-intl";
import "react-toastify/dist/ReactToastify.css";

interface ImportExportProps {
  //
  closeModal: () => void;
}

export default function ImportExportModal(props: ImportExportProps) {
  const t = useTranslations("Tabs");

  //

  return (
    <div className="flex flex-row m-10 align-middle justify-center">
      <div className="flex flex-col gap-4 w-md">
        <p className="text-lg ml-4 capitalize">
          <b>{t("import")}</b>
        </p>
      </div>
    </div>
  );
}
