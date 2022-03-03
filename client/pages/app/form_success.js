import { CheckCircle } from 'react-feather';

export default function FormSuccess() {
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-emerald-200 to-blue-200 text-blue-600 text-xl font-bold'>
      <CheckCircle />
      <div>Submitted successfully!</div>
    </div>
  );
}
