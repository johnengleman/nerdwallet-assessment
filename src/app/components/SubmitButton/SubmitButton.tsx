import { useFormStatus } from "react-dom";

interface SubmitButton {
  text: string;
}

const SubmitButton: React.FC<SubmitButton> = ({ text }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-amber-400 p-3 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? "Adding..." : text}
    </button>
  );
};

export default SubmitButton;
