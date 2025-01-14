export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center my-40 min-h-20">
      <div className="relative w-24 h-24">
        <div className="
          absolute 
          animate-spin 
          rounded-full 
          h-24 w-24 
          border-t-8 border-b-8 border-orange-300
        "></div>
        <div className="
          absolute 
          animate-spin 
          rounded-full 
          h-20 w-20 
          border-r-8 border-l-8 border-red-300
          top-2 left-2
          animation-delay-150
        "></div>
      </div>
    </div>
  );
}