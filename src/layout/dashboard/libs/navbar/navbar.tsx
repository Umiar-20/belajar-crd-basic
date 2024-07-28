export default function Navbar() {
  return (
    <div className="flex w-full px-4 py-2 items-center justify-between h-16 bg-white border-b">
      <div className="flex justify-start items-center gap-10">
        {/* start of logo */}
        <h1 className="text-2xl text-green-600 cursor-pointer font-semibold">
          tanam<span className="text-black">in</span>
        </h1>
        {/* end of logo */}

        {/* start of menu */}
        <div className="flex justify-start items-center gap-8">
          <p className="text-lg cursor-pointer">Home</p>
          <p className="text-lg cursor-pointer">About</p>
          <p className="text-lg cursor-pointer">Service</p>
          <p className="text-lg cursor-pointer">Features</p>
        </div>
        {/* end of menu */}
      </div>
    </div>
  );
}
