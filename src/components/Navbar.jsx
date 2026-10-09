import LoveHeart from "./HeartToggle";

const Navbar = ({ isHeartToggled, onHeartToggle }) => {
  return (
    <>
      <div className="flex justify-center items-center pt-15 md:mb-0 ">
        <LoveHeart isChecked={isHeartToggled} onToggle={onHeartToggle} />
      </div>
    </>
  );
};
export default Navbar;
