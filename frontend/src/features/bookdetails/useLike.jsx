import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeBook as likeBookApi } from "../../api/apiBooks";
import toast from "react-hot-toast";

export function useLike({ id }) {
  const queryClient = useQueryClient();
  const { mutate: likeBook, isPending: isLiking } = useMutation({
    mutationFn: likeBookApi,
    onSuccess: () => {
      toast.success("Book successfully liked");
      queryClient.invalidateQueries({
        queryKey: ["book", String(id)],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { likeBook, isLiking };
}
