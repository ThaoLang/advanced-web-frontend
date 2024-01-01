import CSVImporter from "@/component/excel/CSVImporter";
import { useTranslations } from "next-intl";
import "react-toastify/dist/ReactToastify.css";

interface ImportProps {
  //
  data: any,
  closeModal: () => void;
}

export default function ImportModal(props: ImportProps) {
  const t = useTranslations("GradePage");

  function handleFileUpload(data: any): void {
    // Handle the parsed CSV data, you can send it to an API or process it further
    //   const convertedData: ClassListType[] = data.map((item: any) => ({
    //     class_id: item.class_id,
    //     user_id: item.user_id.toString(), // Convert user_id to string if it's a number
    //     fullname: item.fullname,
    //     role: item.role,
    //     student_id: item.student_id ? item.student_id.toString() : '', // Convert student_id to string if it's a number, or use an empty string if undefined
    // }));
    //   setClassList(convertedData);
  }

  return (
    <div className="flex flex-row m-10 align-middle justify-center">
      <div className="flex flex-col gap-4 w-md">
        <p className="text-lg ml-4 text-center uppercase">
          <b>{t("import")}</b>
        </p>
        <CSVImporter onFileUpload={handleFileUpload} />
      </div>
    </div>
  );
}
