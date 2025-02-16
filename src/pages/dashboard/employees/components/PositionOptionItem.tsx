import {memo} from "react";
import {useAppSelector} from "@/store";
import {positionsSlice} from "@/store/positions.slice.ts";

const PositionOptionItem = memo(function PositionItem({
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

export default PositionOptionItem;