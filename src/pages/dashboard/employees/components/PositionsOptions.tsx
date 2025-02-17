import {memo} from "react";
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

export default function PositionsOptions() {
  const positionsIds = useAppSelector(positionsSlice.selectors.selectPositionsIds);
  return (
    <>
      {positionsIds.map((id) => (<PositionOptionItem positionId={id} key={id} />))}
    </>
  )
}