interface IInput {
  id: string;
  label: string;
  type: string;
  register?: any;
  required?: boolean;
}

function InputComponent({ id, label, type, register, required }: IInput) {
  return (
    <div className="flex flex-col items-center w-[30%] mb-4">
      <div className="flex w-[100%]">
        <label
          htmlFor={id}
          className="text-xs text-[white] font-bold mb-1 ml-2 hover:opacity-60"
        >
          {label}
        </label>
      </div>
      <div className="flex w-[100%]">
        <input
          type={type}
          id={id}
          className="w-[100%] rounded-2xl py-2 px-1"
          {...register(id, { required: true })}
        />
      </div>
    </div>
  );
}

export default InputComponent;
