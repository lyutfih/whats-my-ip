const Loader = () => {
  return (
    <>
      <article className="rounded-xl border absolute z-10 border-gray-700 bg-gray-800 p-4 m-[1.5vh] shadow-xl max-sm:relative overflow-scroll max-h-[97vh] no-scrollbar animate-pulse">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-gray-500 h-16 w-16"></div>
          <div>
            <h4 className="text-gray-400 font-medium text-sm">
              Loading your details...
            </h4>
            <h3 className="text-xl font-medium text-white"></h3>
            <p className="text-xs font-medium text-gray-400"></p>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          <span className="relative flex justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
            <span className="relative z-10 bg-gray-800 px-6">IP Details</span>
          </span>
          <li>
            <span className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-600">
              <p className="h-6 bg-gray-500 rounded-lg mt-2"></p>
              <p className="h-6 bg-gray-500 rounded-lg mt-2"></p>
              <p className="h-4 bg-gray-500 rounded-lg mt-2"></p>
              <p className="h-4 bg-gray-500 rounded-lg mt-2"></p>
            </span>
          </li>

          <span className="relative flex justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
            <span className="relative z-10 bg-gray-800 px-6">
              Country Details
            </span>
          </span>

          <li>
            <span className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-600">
              <p className="h-6 bg-gray-500 rounded-lg mt-2"></p>
              <p className="h-6 bg-gray-500 rounded-lg mt-2"></p>
              <p className="h-4 bg-gray-500 rounded-lg mt-2"></p>
              <p className="h-4 bg-gray-500 rounded-lg mt-2"></p>
            </span>
          </li>
        </ul>
      </article>
    </>
  );
};

export default Loader;
