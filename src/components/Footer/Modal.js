import { BiArrowBack } from "react-icons/bi";
export default function Modal({
  modalData,
  setModalData,
  open,
  onClose,
  children,
}) {
  return (
    <div
      className={`  fixed container inset-0 ${
        open ? "" : "pointer-events-none"
      }`}
    >
      {/* backdrop */}
      <div
        className={`fixed  inset-0 bg-black ${
          open ? "opacity-50" : "pointer-events-none opacity-0"
        } transition-opacity duration-300 ease-in-out`}
        onClick={onClose}
      />
      {/* Hello */}
      <div
        className={`fixed bottom-20 left-0 w-screen max-h-80 overflow-y-auto bg-white shadow-lg  p-4 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        } transition-opacity duration-300 ease-in-out `}
      >
        <div className="container max-w-4xl mx-auto flex justify-between items-center border-gray-400 pb-1 border-b-2">
          <p className="font-semibold flex gap-2 items-center">
            {modalData === "login" && (
              <span onClick={() => setModalData("cart")}>
                <BiArrowBack />
              </span>
            )}{" "}
            {modalData === "cart" ? "Cart Details" : "Please Login"}
          </p>

          <button onClick={onClose} className="font-semibold">
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
