import {
  FaRegEye,
  FaArrowUp,
  FaChalkboard,
  FaChalkboardUser,
  FaPersonChalkboard,
} from "react-icons/fa6";

export default function Dashboard() {
  return (
    <div className="flex flex-col mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-slate-100">
      <div className="stats-vertical stats lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-figure text-primary text-3xl">
            <FaRegEye className="bg-slate-200 bg-transparent" />
          </div>
          <div className="stat-title">Total views</div>
          <div className="stat-value text-primary">69420</div>
          <div className="stat-desc flex items-center gap-1 text-sm font-medium text-lime-500">
            <span>3.50% </span>
            <FaArrowUp />
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-primary text-3xl">
            <FaChalkboard className="bg-slate-200 bg-transparent" />
          </div>
          <div className="stat-title">Total classes</div>
          <div className="stat-value text-primary">15</div>
          <div className="stat-desc flex items-center gap-1 text-sm font-medium text-lime-500">
            <span>3.50% </span>
            <FaArrowUp />
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-primary text-3xl">
            <FaChalkboardUser className="bg-slate-200 bg-transparent" />
          </div>
          <div className="stat-title">Total teachers</div>
          <div className="stat-value text-primary">5</div>
          <div className="stat-desc flex items-center gap-1 text-sm font-medium text-lime-500">
            <span>3.50% </span>
            <FaArrowUp />
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-primary text-3xl">
            <FaPersonChalkboard className="bg-slate-200 bg-transparent" />
          </div>
          <div className="stat-title">Total students</div>
          <div className="stat-value text-primary">694</div>
          <div className="stat-desc flex items-center gap-1 text-sm font-medium text-lime-500">
            <span>3.50% </span>
            <FaArrowUp />
          </div>
        </div>
      </div>
      <div className="text-center">
        <h1 className="my-10 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Welcome to the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            LightHub Dashboard
          </span>
          ! 🚀
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Great to have you here, Admin. Let&apos;s make things happen and keep
          everything in check! If you need any assistance, feel free to reach
          out. Happy managing!
        </p>
      </div>
    </div>
  );
}
