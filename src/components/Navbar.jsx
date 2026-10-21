import LoveHeart from "./HeartToggle";

const Navbar = ({ isHeartToggled, onHeartToggle }) => {
  return (
    <>
      <div className="flex justify-center items-center pt-8 sm:pt-12 mb-2 md:mb-0 px-4">
        <LoveHeart isChecked={isHeartToggled} onToggle={onHeartToggle} />
      </div>
    </>
  );
};
export default Navbar;
