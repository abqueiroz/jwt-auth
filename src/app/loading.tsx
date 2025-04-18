
export default function Loading() {
    return (
        <div className="flex flex-col items-center space-y-6">
        <div className="flex space-x-4">
          <div className="w-6 h-6 rounded-full bg-blue-500 animate-slide-in-out "/>
          <div style={{animationDelay:'100ms'}} className="w-6 h-6 rounded-full bg-green-500 animate-slide-in-out"/>
          <div style={{animationDelay:'300ms'}} className="w-6 h-6 rounded-full bg-purple-500 animate-slide-in-out"/>
        </div>
      </div>
    );
}

