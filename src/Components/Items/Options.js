import { DuplicateIcon, TrashIcon } from "@heroicons/react/solid";
import EditItem from "./EditItem";
export default function Options({ item }) {
  return (
    <div className="w-full flex flex-row justify-evenly">
      <EditItem
        id={item.id}
        name={item.name}
        note={item.note}
        status={item.status}
      />
      <div
        className="p-1 rounded-md hover:bg-[rgba(0,0,0,0.1)] cursor-pointer"
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("dispatchDeleteById", { detail: { id: item.id } })
          )
        }
      >
        <TrashIcon className="w-6 h-6 text-red-600" />
      </div>
      <div
        className="p-1 rounded-md hover:bg-[rgba(0,0,0,0.1)] cursor-pointer"
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("duplicateItem", { detail: { item: item } })
          )
        }
      >
        <DuplicateIcon className="w-6 h-6 text-red-600" />
      </div>
    </div>
  );
}
