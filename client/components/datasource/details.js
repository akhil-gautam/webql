import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { XSquare } from 'react-feather';

export default function Details({ data, onClose }) {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm backdrop-filter transition-all duration-500'
        onClose={onClose}
      >
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay as='main' className='fixed inset-0 bg-gray-400 opacity-60' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
              <Dialog.Title
                as='h3'
                className='text-lg font-bold leading-6 text-gray-900 mb-5 flex justify-between border-b pb-4'
              >
                <header>Viewing details</header>
                <XSquare className='cursor-pointer' onClick={onClose} />
              </Dialog.Title>
              <Dialog.Description as='div' className=''>
                {Object.keys(data).map((key) => (
                  <div key={key} className='text-lg my-4 border p-4'>
                    <div className='font-bold  capitalize'>{key}</div>
                    <div className='font-serif'>{data[key]}</div>
                  </div>
                ))}
              </Dialog.Description>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
