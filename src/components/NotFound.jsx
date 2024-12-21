export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold text-red-500 mb-6">404 - Страница не найдена :(</h1>
      <img 
        src="/images/404.jpg" 
        alt="Not Found" 
        className="w-1/2 max-w-md rounded shadow-lg"
      />
    </div>
  );
}

