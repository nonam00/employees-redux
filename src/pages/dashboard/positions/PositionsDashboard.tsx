import {memo} from "react";
import {useAppDispatch, useAppSelector} from "@/store";
import PositionAddForm from "./components/PositionAddForm.tsx";
import PositionEditForm from "./components/PositionEditForm.tsx";
import {positionsSlice} from "@/store/positions.slice.ts";
import DashboardHeader from "@/components/DashboardHeader.tsx";

const PositionDashboardItem = memo(function PositionDashboardItem({
  positionId
}: {
  positionId: number
}) {
  const position = useAppSelector(state =>
    positionsSlice.selectors.selectPosition(state, positionId))
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-row">
      <p className="flex-1">{position.title}</p>
      <p className="flex-1">{position.salary}</p>
      <button
        className="
          flex-1
          rounded-sm
          bg-transparent
          text-black
          hover:bg-blue-500
          hover:text-white
          cursor-pointer
          transition
        "
        onClick={() => dispatch(positionsSlice.actions.select({positionId}))}
      >
        Edit
      </button>
      <button
        className="
          flex-1
          rounded-sm
          bg-transparent
          text-black
          hover:bg-red-500
          hover:text-white
          cursor-pointer
          transition
        "
        onClick={() => dispatch(positionsSlice.actions.remove({positionId}))}
      >
        Delete
      </button>
    </div>
  )
});

export default function PositionsDashboard(){
  const companiesIds = useAppSelector(positionsSlice.selectors.selectPositionsIds);
  const selectedId = useAppSelector(positionsSlice.selectors.selectSelectedPositionId);
  return (
    <>
      <DashboardHeader/>
      <div className="flex flex-col m-15">
        <h1 className="text-3xl m-5">Employees dashboard editor:</h1>
        {selectedId === undefined ? <PositionAddForm/> : <PositionEditForm positionId={selectedId}/>}
        <div className="flex flex-col items-center justify-center w-100">
          <div className="flex flex-row items-center w-100 border-b-1">
            <b className="flex-1">Title</b>
            <b className="flex-1">Salary</b>
            <b className="flex-1">Edit</b>
            <b className="flex-1">Delete</b>
          </div>
          <ul className="flex flex-col list-none w-full">
            {companiesIds.map((positionId) => (
              <PositionDashboardItem positionId={positionId} key={positionId}/>
            ))}
          </ul>
        </div>
      </div>
    </>

  )
}