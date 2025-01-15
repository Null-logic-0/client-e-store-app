import { cn } from "@/utils/utils";

function Button({ type = "button", onClick, className, children, ...props }) {
  return (
    <button
      type={type}
      className={cn("custom-btn", className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
