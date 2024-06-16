import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/apiAuth";

export function useUser() {
  const { isPending, data:user, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {isPending, user, error}
}
