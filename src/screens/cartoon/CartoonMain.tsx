import { useAppSelector } from "../../redux/hooks";
import Title from "../../components/Title";

import SceneList from "../../components/SceneList";

function CartoonMain() {
  const data = useAppSelector((state) => state.cartoon);
  console.log(data);

  return (
    <div className="bg-[#21201E] h-screen p-12">
      <Title />

      <SceneList sceneList={data.cartoon.sceneList} />
    </div>
  );
}

export default CartoonMain;
