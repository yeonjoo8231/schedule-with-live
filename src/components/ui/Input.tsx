type InputType = 'text' | 'email' | 'password' | 'number' | 'nickname' | 'file';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: InputType;
  placeholder?: string;
  required?: boolean;
}

const Input = ({
  name,
  type = 'text',
  placeholder = '',
  required = false,
  ...props
}: InputProps) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className='w-full p-4 border border-gray-200 rounded-[5px] my-2'
      {...props}
    />
  );
};

export default Input;
