export default function RadioInput({
  label,
  db_column,
  register,
  settings: { options = null },
}) {
  if (options.length === 0) {
    return null;
  }
  if (!options) {
    return null;
  }

  return (
    <div className='w-full flex flex-col'>
      <div className='label-text font-semibold text-gray-700 mb-2'>
        {label}:
      </div>
      {options.split(';').map((option) => (
        <label className='cursor-pointer label hover:bg-gray-100' key={option}>
          <span className='label-text'>{option}</span>
          <input
            type='radio'
            className='radio'
            value={option}
            {...register(db_column)}
          />
        </label>
      ))}
    </div>
  );
}
