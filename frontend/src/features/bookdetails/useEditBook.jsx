import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBook as editBookapi } from "../../api/apiBooks";
import toast from "react-hot-toast";

export function useEditBook() {
  const queryClient = useQueryClient();
  const { mutate: editBook, isPending: isEditing } = useMutation({
    mutationFn: ({ formData, id }) => editBookapi(formData, id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["book", String(data?.id)],
      });
      toast.success("Book successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editBook };
}
