"use client";

// import { useFormState } from "react-dom";
import { useActionState } from "react";
import { useEffect } from "react";
// import { toast } from "@/components/ui/sonner";
import { toast } from "sonner";
import { actionFunction } from "@/utils/types";

const initialState = {
  message: "",
};

function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, initialState);
  //   const { toast } = useToast();
  useEffect(() => {
    if (state.message) {
      toast(state.message);
    }
  }, [state]);
  return <form action={formAction}>{children}</form>;
}
export default FormContainer;
