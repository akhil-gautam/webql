import { Loader } from 'react-feather';

export default function Button({
  isLoading,
  children,
  className = '',
  ...rest
}) {
  return (
    <button
      className={`btn space-x-5 ${
        isLoading ? 'bg-gray-500 cursor-not-allowed' : ''
      } ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {isLoading && (
        <span className='animate-spin'>
          <Loader />
        </span>
      )}
    </button>
  );
}
