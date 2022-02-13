import React from "react";

export default function Form({
  formValues,
  setFormValues,
  closeModal,
  dispatcher,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    dispatcher({ formValues });
    closeModal();
  }
  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="block text-md font-medium leading-5 text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            className="rounded-md w-full p-2"
            required={true}
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="block text-md font-medium leading-5 text-gray-700"
          >
            Status:
          </label>
          <input
            type="text"
            className="rounded-md w-full p-2"
            required={true}
            value={formValues.status}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                status: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="w-full mt-2">
        <label
          htmlFor="name"
          className="block text-md font-medium leading-5 text-gray-700"
        >
          Note:
        </label>
        <textarea
          value={formValues.note}
          type="text"
          className="rounded-md w-full mt-2 p-2"
          onChange={(e) =>
            setFormValues({ ...formValues, note: e.target.value })
          }
        />
      </div>
      <div className="mt-4 w-full flex flex-row-reverse gap-2">
        <button
          type="submit"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium  text-white bg-blue-400 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="inline-flex justify-center px-4 py-2 text-sm font-medium  text-white bg-red-600 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
