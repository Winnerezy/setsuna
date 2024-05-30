import React from "react";
import { Button } from "../@/components/ui/button";

export default function CustomButton({ type }: { type: string }) {
  return (
    <Button
      type="submit"
      className="p-1 w-36 rounded-se-[10px] rounded-es-[10px]  border-2 border-[var(--global-border-bg)] font-semibold tracking-wide text-lg hover:bg-[var(--global-button-bg)] transition duration-200 ease-in-out self-center shadow-md"
    >
      {type === "sign-in" ? "Sign In" : "Sign Up"}
    </Button>
  );
}
