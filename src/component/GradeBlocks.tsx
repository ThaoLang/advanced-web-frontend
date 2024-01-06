import React from "react";
import { IoMdClose } from "react-icons/io";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxDragHandleDots2 } from "react-icons/rx";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import EditGradeForm from "./EditGradeForm";
import DeleteGradeForm from "./DeleteGradeForm";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { RubricType } from "@/model/RubricType";

interface SortableListProps {
  items: RubricType[];
  setRubrics: (rubrics: RubricType[]) => void;
}

interface SortableItemProps {
  rubric: RubricType;
  setRubrics: (rubrics: RubricType[]) => void;
  handleUpdate: (updatedRubric: RubricType) => void;
}
const DragHandle = SortableHandle(() => <RxDragHandleDots2 />);
const SortableItem = SortableElement<RubricType>((props: SortableItemProps) => {
  const [showEditModal, setEditShowModal] = React.useState(false);
  const [showDeleteModal, setDeleteShowModal] = React.useState(false);
  const auth = useAuth();

  const handleEditModal = () => {
    console.log("Editting modal", props.rubric);
    setEditShowModal(!showEditModal);
  };

  const handleDeleteModal = () => {
    setDeleteShowModal(!showDeleteModal);
  };
  const handleDeleteGrade = async (rubric_id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}rubric/${rubric_id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        }
      );
      if (response.status === 200) {
        const newRubrics = response.data;

        props.setRubrics(newRubrics);
      }
    } catch (error: any) {
      console.error("Failed to delete rubric:", error);
    }
    handleDeleteModal();
  };

  const handleEditGrade = async (gradeName: string, gradeScale: number) => {
    const newRubric: RubricType = {
      _id: props.rubric._id,
      classId: props.rubric.classId,
      gradeName: gradeName,
      gradeScale: gradeScale,
      order: props.rubric.order,
      status: props.rubric.status,
    };
    props.handleUpdate(newRubric);
    handleEditModal();
  };

  return (
    <div className="flex flex-row items-center my-2 p-2 bg-gray-100 rounded mx-auto max-w-3xl">
      <div className="flex-shrink-0 cursor-grab">
        <DragHandle />
      </div>

      <div className="flex-1 max-w-64 mx-4">
        <div>{props.rubric.gradeName}</div>
      </div>

      <div className="flex-1 max-w-32 mx-4">
        <div>{props.rubric.gradeScale}%</div>
      </div>

      <div className="flex flex-row space-x-4">
        <div className="" onClick={handleEditModal}>
          <MdOutlineModeEditOutline />
        </div>
        <div className="" onClick={handleDeleteModal}>
          <RiDeleteBinLine color="red" />
        </div>
      </div>

      {/* Edit Modal */}
      <dialog className={`modal ${showEditModal ? "modal-open" : ""}`}>
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-500"></p>
            <button onClick={handleEditModal}>
              <IoMdClose />
            </button>
          </div>
          <EditGradeForm
            name={props.rubric.gradeName}
            scale={props.rubric.gradeScale}
            handleUpdate={handleEditGrade}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleEditModal}>close</button>
        </form>
      </dialog>

      {/* Delete Modal */}
      <dialog className={`modal ${showDeleteModal ? "modal-open" : ""}`}>
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-500">
              {/* Press X or click outside to close */}
            </p>
            <button onClick={handleEditModal}>
              <IoMdClose />
            </button>
          </div>
          <DeleteGradeForm
            name={props.rubric.gradeName}
            scale={props.rubric.gradeScale}
            id={props.rubric._id}
            deleteFunc={handleDeleteGrade}
            cancelFunc={() => setDeleteShowModal(!showDeleteModal)}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleDeleteModal}>close</button>
        </form>
      </dialog>
    </div>
  );
});

const SortableList = SortableContainer((props: SortableListProps) => {
  console.log("Sort List Item", props.items);
  const handleUpdate = (updatedRubric: RubricType) => {
    const updatedItems = props.items.map((item) =>
      item._id === updatedRubric._id ? updatedRubric : item
    );

    props.setRubrics(updatedItems);
  };
  return (
    <ul>
      {props.items &&
        props.items.length > 0 &&
        props.items.map((value, index) => (
          <SortableItem
            key={`item-${value._id}`}
            index={index}
            rubric={value}
            setRubrics={props.setRubrics}
            handleUpdate={handleUpdate}
          />
        ))}
    </ul>
  );
});

export default SortableList;
