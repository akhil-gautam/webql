export default function TextAreaInput({
  label,
  required = false,
  placeholder = '',
  helper_text = '',
  db_column,
  register,
}) {
  return (
    <label className='w-full form-group form-control'>
      <span className='label-text font-semibold text-gray-700 mb-2'>
        {label}:
      </span>
      <textarea
        className='textarea textarea-primary h-24 textarea-bordered mb-1'
        placeholder={placeholder}
        required={required}
        {...register(db_column)}
      ></textarea>
      {helper_text.length !== 0 && (
        <span className='label-text-alt'>{helper_text}</span>
      )}
    </label>
  );
}
