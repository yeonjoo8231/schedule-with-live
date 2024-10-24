import Input from '@/components/ui/Input';
import { signup, login } from './actions';

export default function LoginPage() {
  return (
    <form>
      <Input
        placeholder='이메일'
        id='email'
        name='email'
        type='email'
        required
      />
      <Input
        placeholder='비밀번호'
        id='password'
        name='password'
        type='password'
        required
      />
      <button
        formAction={login}
        className='w-full p-4 rounded-[5px] my-2 bg-[#3F7EFE] text-white font-bold'
      >
        로그인
      </button>
      <button
        formAction={signup}
        className='w-full p-4 rounded-[5px] my-2 bg-white border border-[#3F7EFE] text-[#3F7EFE] font-bold'
      >
        회원가입
      </button>
    </form>
  );
}
