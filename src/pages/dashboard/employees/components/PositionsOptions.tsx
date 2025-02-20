import {memo, useEffect} from "react";
import {useAppSelector} from "@/store";
import {positionsSlice} from "@/store/positions.slice";

const PositionOptionItem = memo(function PositionOptionItem({
  positionId,
}: {
  positionId: number;
}) {
  const position = useAppSelector(state =>
    positionsSlice.selectors.selectPosition(state, positionId));
  return (
    <option value={positionId}>{position.title} ({position.salary})</option>
  )
})

export default function PositionsOptions({
  isPending,
  setPositionIdCallback
}: {
  isPending: boolean;
  setPositionIdCallback: (value: number) => void
}) {
  const positionsIds = useAppSelector(positionsSlice.selectors.selectPositionsIds);
  useEffect(() => {
    setPositionIdCallback(positionsIds[0])
  }, [positionsIds, setPositionIdCallback]);
  return (
    <select
      className="border-1 rounded-sm border-black"
      value={positionsIds[0]}
      onChange={(e) => setPositionIdCallback(parseInt(e.target.value))}
      disabled={isPending}
    >
      {positionsIds.map((id) => (<PositionOptionItem positionId={id} key={id}/>))}
    </select>
  );
}