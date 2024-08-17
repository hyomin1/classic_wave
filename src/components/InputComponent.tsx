interface IInput {
  id: string;
  label: string;
  type: string;
  register?: any;
  required?: boolean;
}

function InputComponent({ id, label, type, register, required }: IInput) {
  return (
    <div className="flex flex-col items-center w-full mb-4">
      <label
        htmlFor={id}
        className="text-xs text-[white] font-bold mb-1 ml-1 hover:opacity-60"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-[30%] rounded-2xl p-2 mb-4"
        {...register(id, { required })}
      />
    </div>
  );
}

export default InputComponent;
