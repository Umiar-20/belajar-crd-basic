import { MouseEvent, ReactNode } from "react";

interface IModal {
  openModal: boolean;
  closeModal: () => void;
  children: ReactNode;
}

export default function Modal({ openModal, closeModal, children }: IModal) {
  const handleCloseModal = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.id === "ModalContainer") {
      closeModal();
    }
  };

  return (
    openModal && (
      <div
        id="ModalContainer"
        onClick={handleCloseModal}
        className="fixed inset-0 bg-black flex justify-center items-center bg-opacity-50 backdrop-blur-sm"
      >
        <div className="bg-white w-10/12 md:w-6/12 lg:w-4/12 shadow-inner rounded-lg p-6">
          {children}
        </div>
      </div>
    )
  );
}
