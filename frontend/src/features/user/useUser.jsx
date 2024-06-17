import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/apiAuth";

export function useUser(username) {
  const { isPending, data:user, error } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
  });

  return {isPending, user, error}
}
