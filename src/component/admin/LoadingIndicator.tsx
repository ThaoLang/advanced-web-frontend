export default function LoadingIndicator() {

    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 backdrop-blur-md bg-opacity-50 bg-gray-800 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="text-4xl text-white"><span className="loading loading-dots loading-lg"></span></div>
        </div>
    )
}