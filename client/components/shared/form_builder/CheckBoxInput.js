export default function CheckBoxInput({
  label,
  db_column,
  required = false,
  register,
}) {
  return (
    <label className='w-full flex space-x-2 items-center my-4'>
      <input
        type='checkbox'
        className='checkbox checkbox-primary'
        required={required}
        {...register(db_column)}
      />
      <span className='label-text font-semibold text-gray-700'>{label}</span>
    </label>
  );
}
