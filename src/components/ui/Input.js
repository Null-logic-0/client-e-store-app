import { cn } from "@/utils/utils";

function Input({ type, className, ...props }) {
  return (
    <input type={type} className={cn("custom-input", className)} {...props} />
  );
}

export default Input;
