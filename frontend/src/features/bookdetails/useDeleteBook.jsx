import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBook as deleteBookApi } from "../../api/apiBooks";
import { useNavigate } from "react-router-dom";

export function useDeleteBook() {
  const currentParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const { mutate: deleteBook, isPending: isDeleting } = useMutation({
    mutationFn: deleteBookApi,
    onSuccess: () => {
      navigate(`/books/?${currentParams.toString()}`)
      toast.success("Book successfully deletd");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBook };
}
