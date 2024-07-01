import { useMutation } from "@tanstack/react-query";
import { createBook as createBookapi } from "../../api/apiBooks";
import toast from "react-hot-toast";

export function useCreateBook() {
  const { mutate: createBook, isPending: isCreating} = useMutation({
    mutationFn: createBookapi,
    onSuccess: () => {
      toast.success("New Book successfully created");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createBook };
}