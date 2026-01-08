export default function LoadingPage({text} : {text:string}) {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xl text-gray-600">{text}</span>
      </div>
    </div>
  );
}