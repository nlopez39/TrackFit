//the user's current diet goes here:
import { useQuery } from "@apollo/client";
import DietList from "../components/DietList";
import { QUERY_DIET } from "../utils/queries";

export default function Diet() {
  const { loading, data } = useQuery(QUERY_DIET);
  const diets = data?.diets || [];
  return (
    <div>
      User's diet goes here: under development 🔨
      <DietList diets={diets} />
    </div>
  );
}
