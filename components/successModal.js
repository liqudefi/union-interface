import confetti from "canvas-confetti";
import { useEffect } from "react";
import Modal from "./modal";
import Button from "./button";
import { useRouter } from "next/router";

const SuccessModal = ({ isOpen, onDismiss }) => {
  const router = useRouter();

  useEffect(() => {
    (async function () {
      if (isOpen) {
        const end = Date.now() + 1.5 * 1000;

        (function frame() {
          confetti({
            particleCount: 8,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });

          confetti({
            particleCount: 8,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      }
    })();
  }, [isOpen]);

  const startBorrowing = () => {
    onDismiss();
    router.push("/borrow");
  };

  return (
    <Modal className="wide" isOpen={isOpen} onDismiss={onDismiss}>
      <div className="p-4 sm:p-6 text-center">
        <div className="mb-12">
          <h2 className="text-3xl mt-6 mb-8">
            <span role="img" aria-label="Party Popper">
              🎉
            </span>{" "}
            Congrats!{" "}
            <span role="img" aria-label="Confetti ball">
              🎊
            </span>
          </h2>
          <p className="text-xl mb-2">You're now a Union member.</p>
          <p>Don't worry though, no dues here from here on.</p>
        </div>

        <Button full onClick={startBorrowing}>
          Start borrowing
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
