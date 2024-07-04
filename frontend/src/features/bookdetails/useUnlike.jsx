import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unlikeBook as unlikeBookApi } from "../../api/apiBooks";
import toast from "react-hot-toast";

export function useUnlike({ id }) {
  const queryClient = useQueryClient();
  const { mutate: unlikeBook, isPending: isUnliking } = useMutation({
    mutationFn: unlikeBookApi,
    onSuccess: () => {
      toast.success("Book successfully unliked");
      queryClient.invalidateQueries({
        queryKey: ["book", String(id)],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { unlikeBook, isUnliking };
}
