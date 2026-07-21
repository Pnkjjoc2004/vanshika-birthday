import monkeyLaptop from "../assets/monkey-laptop.gif";
const MobilePopup = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl text-white font-bold mb-4">Tu nhi manegi kyu</h2>
        <p className="text-gray-300 mb-6">
          Laptop me khol le itna jiddi nhi hona chahihye
        </p>

        {/* Local GIF Image without border */}
        <div className="rounded-xl overflow-hidden shadow-md">
          <img
            src={monkeyLaptop}
            alt="Monkey using laptop"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default MobilePopup;
