import { EyeOff as EyeOffIcon, Eye as EyeIcon } from 'lucide-react';
import { useState, useRef } from 'react';

function PasswordInput({ options }) {
  const [isPasswordVisisble, setIsPasswordVisisble] = useState(false);
  const passowrdInput = useRef(null);

  function togglePasswordVisibility() {
    setIsPasswordVisisble((status) => !status);
    const end = passowrdInput.current.value.length;
    setTimeout(() => {
      passowrdInput.current.focus();
      passowrdInput.current.setSelectionRange(end, end);
    }, 0);
  }
  const additionalStyles = options.error ? 'border-red-500 focus:outline-0' : '';

  return (
    <div>
      <div className='relative w-full'>
        <input
          ref={passowrdInput}
          className={`bg-tea_green-DEFAULT focus:border-2' w-full rounded-md border p-2 ${additionalStyles}`}
          type={isPasswordVisisble ? 'text' : 'password'}
          name={options.name}
          id={options.id}
          placeholder={options.placeholder}
          value={options.value}
          onChange={(e) => options.setter(e.target.value)}
          required
        />
        <button
          className='absolute top-1/2 right-2 w-fit -translate-y-1/2 hover:cursor-pointer'
          type='button'
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisisble ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      </div>
      {options.error && <p className='-mb-4 p-2 text-red-500'>{options.error}</p>}
    </div>
  );
}
export default PasswordInput;
