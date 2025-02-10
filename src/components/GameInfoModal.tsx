import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Cell from "./Cell";
import { letterStatus } from "../utils/utils";
import CloseIcon from "../assets/CloseIcon.svg";
import Absent from "../assets/absent.png";
import Present from "../assets/present.png";
import Correct from "../assets/correct.png";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const GameInfoModal = ({ isOpen, onClose }: Props) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialog.current) {
      if (isOpen) {
        dialog.current.showModal();
      } else {
        dialog.current?.close();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <dialog ref={dialog} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md relative w-full sm:max-w-lg h-auto max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            role="close"
            onClick={onClose}
            className="absolute top-3 right-3"
          >
            {<img src={CloseIcon} />}
          </button>

          {/* Modal Title */}
          <h1 className="text-3xl font-semibold text-center mb-3">
            How To Play
          </h1>

          {/* Modal Content */}
          <p className="text-center text-gray-700">
            Guess the Word in 5 tries.
          </p>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              You have to guess the hidden word in 5 tries and the color of the
              letters changes to show how close you are.
            </p>
            <h1>To start the game, just enter any word, for example:</h1>
            <div className="flex justify-center mb-1">
              <Cell character="T" state={letterStatus.absent} />
              <Cell character="A" state={letterStatus.present} />
              <Cell character="B" state={letterStatus.absent} />
              <Cell character="L" state={letterStatus.present} />
              <Cell character="E" state={letterStatus.correct} />
            </div>

            <div className="bg-slate-100 rounded">
              <p className="flex gap-2 mb-1">
                <img src={Absent} className="h-10 w-20" />
                aren't in the target word at all.
              </p>
              <p className="flex gap-2 mb-1">
                <img src={Present} className="h-10 w-20" />
                is in the word but in the wrong spot.
              </p>
              <p className="flex gap-2">
                <img src={Correct} className="h-10 w-10" />
                is in the word and in the correct spot.
              </p>
            </div>

            <div className="m-3">
              <h1 className="text-center">
                Another try to find matching letters in the target word.
              </h1>
              <div className="flex justify-center">
                <Cell character="F" state={letterStatus.correct} />
                <Cell character="L" state={letterStatus.correct} />
                <Cell character="A" state={letterStatus.correct} />
                <Cell character="S" state={letterStatus.absent} />
                <Cell character="H" state={letterStatus.absent} />
              </div>
              <h1 className="text-center">So Close!</h1>
            </div>

            <div className="mt-5">
              <div className="flex justify-center">
                <Cell character="F" state={letterStatus.correct} />
                <Cell character="L" state={letterStatus.correct} />
                <Cell character="A" state={letterStatus.correct} />
                <Cell character="M" state={letterStatus.correct} />
                <Cell character="E" state={letterStatus.correct} />
              </div>
              <h1 className="text-center font-extrabold">Got It!!!</h1>
            </div>
          </div>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
};

export default GameInfoModal;
