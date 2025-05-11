import { useState, useEffect } from "react";
import "../components/HomePageCss.css";
import Stepper, { Step } from "./Animations/Stepper/Stepper";
import Navbar from "./Navbar";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if today is May 19th
    const checkDate = () => {
      const today = new Date();
      const targetDate = new Date(today.getFullYear(), 4, 19); // Month is 0-indexed, so 4 = May

      // Calculate if we should show content
      // const isMay19 = today.getDate() === 19 && today.getMonth() === 4;
      const isMay19 = true;
      setIsVisible(isMay19);

      // Calculate time remaining until May 19
      if (!isMay19) {
        // If today is after May 19 this year, set target to next year
        if (today > targetDate) {
          targetDate.setFullYear(today.getFullYear() + 1);
        }

        const timeDiff = targetDate - today;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      }

      setIsLoading(false);
    };

    // Initial check
    checkDate();

    // Update countdown every second
    const timerInterval = setInterval(checkDate, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerInterval);
  }, []);

  if (isLoading) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  }

  // This is the only part that changed - reversed the condition
  if (!isVisible) {
    return (
      <div className="h-dvh overflow-y-hidden">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <h1 className="text-3xl text-fuchsia-400 font-bold mb-8">
            This surprise will be revealed on May 19th!
          </h1>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl text-white font-semibold mb-4">
              Countdown to the surprise:
            </h2>
            <div className="flex gap-4 justify-center">
              <div className="bg-gray-700 p-3 rounded-md w-24">
                <div className="text-3xl text-white font-bold">
                  {timeRemaining.days}
                </div>
                <div className="text-sm text-gray-300">Days</div>
              </div>
              <div className="bg-gray-700 p-3 rounded-md w-24">
                <div className="text-3xl text-white font-bold">
                  {timeRemaining.hours}
                </div>
                <div className="text-sm text-gray-300">Hours</div>
              </div>
              <div className="bg-gray-700 p-3 rounded-md w-24">
                <div className="text-3xl text-white font-bold">
                  {timeRemaining.minutes}
                </div>
                <div className="text-sm text-gray-300">Minutes</div>
              </div>
              <div className="bg-gray-700 p-3 rounded-md w-24">
                <div className="text-3xl text-white font-bold">
                  {timeRemaining.seconds}
                </div>
                <div className="text-sm text-gray-300">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original content to show on May 19th
  return (
    <div className="h-dvh overflow-y-hidden customBackground">
      <Navbar />
      <Stepper
        initialStep={1}
        onStepChange={(step) => {
          console.log(step);
        }}
        onFinalStepCompleted={() => console.log("All steps completed!")}
        backButtonText="Previous"
        nextButtonText="Continue"
      >
        <Step>
          <h2 className="text-xl text-white font-bold">
            Hey Yashika!!🌟 It&apos;s your special day.
          </h2>
        </Step>
        <Step>
          <h2 className="text-lg text-white font-bold ">
            I&apos;ve prepared something magical just for you.
          </h2>
          <img
            style={{
              height: "100px",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center -70px",
              borderRadius: "15px",
              marginTop: "1em",
            }}
            src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894"
          />
        </Step>
        <Step>
          <h2 className="text-xl text-white font-bold">
            Before you begin, i want to say you are the best girl i have ever
            met...
          </h2>
        </Step>
        <Step>
          <h2 className="text-xl text-white font-bold">Final Step</h2>
          <p className="text-lg text-white font-bold">You made it!</p>
        </Step>
      </Stepper>
    </div>
  );
};

export default HomePage;
