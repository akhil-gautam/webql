export default function SelectInput({
  label,
  required = false,
  helper_text = '',
  db_column,
  register,
  settings: { options = [] },
}) {
  return (
    <label className='w-full form-control space-y-1'>
      <span className='label-text font-semibold text-gray-700'>{label}:</span>
      <select
        className='input input-bordered input-primary font-semibold'
        required={required}
        {...register(db_column)}
      >
        {options.map((option) => (
          <option key={option} value={value}>
            {option}
          </option>
        ))}
      </select>
      {helper_text.length !== 0 && (
        <span className='label-text-alt'>{helper_text}</span>
      )}
    </label>
  );
}
