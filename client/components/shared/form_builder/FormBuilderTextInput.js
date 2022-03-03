export default function FormBuilderTextInput({
  label,
  field_type,
  required = false,
  helper_text = '',
  placeholder,
  db_column,
  register,
}) {
  return (
    <label className='w-full form-control space-y-1'>
      <span className='label-text font-semibold text-gray-700'>{label}:</span>

      <input
        className='input input-primary input-bordered font-semibold'
        type={field_type}
        placeholder={placeholder}
        required={required}
        {...register(db_column)}
      />
      {helper_text.length !== 0 && (
        <span className='label-text-alt'>{helper_text}</span>
      )}
    </label>
  );
}
