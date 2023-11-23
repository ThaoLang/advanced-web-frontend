import { useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import PaginationBar from "./PaginationBar";
import SmallClass from "./classItem/SmallClass";
import { FaPlus } from "react-icons/fa";

const classes = [
  {
    id: 1,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 2,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 3,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 1,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name 2",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 2,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name 2",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 3,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name 2",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 1,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 2,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 3,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 1,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name 2",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 2,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name 2",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 3,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name 2",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 1,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 2,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 3,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 1,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name 2",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 2,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name 2",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
  {
    id: 3,
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/011/005/174/original/creative-education-background-with-school-supplies-vector.jpg",
    name: "My Class Name 2",
    description: "This is the class",
    inviteUrl: "inviteurl",
  },
];

export default function HomePage() {
  const auth = useAuth();
  const maxItemNumber = 3;
  const limit = 5;
  const totalPages = 
    classes.length % maxItemNumber === 0
      ? classes.length / maxItemNumber
      : (classes.length - (classes.length % maxItemNumber)) / maxItemNumber + 1;
  const [page, setPage] = useState(1);

  const filterData = useMemo(() => {
    return classes.filter((item, index) => {
      return (
        index >= (page - 1) * maxItemNumber && index < page * maxItemNumber
      );
    });
  }, [page]);

  const [showModal, setShowModal] = useState(false);

  function addNewClass() {
    setShowModal(true);
  }

  function createClass() {
    //
    setShowModal(false);
  }

  function joinClass() {
    //
    setShowModal(false);
  }

  return auth.user ? (
    <div className="mx-20 my-10">
      <p className=" mb-5 text-lg">
        Welcome back <b>{auth.user.username}</b> !
      </p>

      <div className="flex justify-around items-center font-poppins mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-9/12 pt-10 ">
          <div
            className="max-w-[240px] bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl cursor-pointer"
            onClick={() => addNewClass}
          >
            <div className="h-80 flex items-center justify-center text-4xl">
              <FaPlus />
            </div>
          </div>

          {/* TODO: update to make this functional */}
          {showModal && (
            <dialog className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click outside to close</p>
                <button className="" onClick={() => joinClass}>
                  Join class
                </button>
                <button className="" onClick={() => createClass}>
                  Create class
                </button>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          )}

          {filterData.map((items, index) => (
            <SmallClass
              id={items.id}
              imageUrl={items.imageUrl}
              name={items.name}
              description={items.description}
              inviteUrl={items.inviteUrl}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center max-w-screen-lg container mx-auto">
        <PaginationBar
          total={totalPages}
          limit={limit}
          current={page}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  ) : (
    <div></div>
  );
}
