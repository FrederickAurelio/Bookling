import { useMutation } from "@tanstack/react-query";
import { createBook as createBookapi } from "../../api/apiBooks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateBook() {
  const currentParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const { mutate: createBook, isPending: isCreating } = useMutation({
    mutationFn: createBookapi,
    onSuccess: (data) => {
      navigate(`/books/${data.id}?${currentParams.toString()}`);
      toast.success("New Book successfully created");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createBook };
}