import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, If, InputField, Stack } from '@green-intelligence/ui';
import imgUrl from '/apps/auth/src/assets/login.jpg';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import Cookies from 'js-cookie';

const loginFormSchema = z.object({
  username: z.string().trim().min(1, { message: 'username is required' }),
  password: z.string().trim().min(1, { message: 'password is required' }),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async ({ username, password }: LoginForm) => {
    try {
      setIsLoading(true);
      const res = await fetch('http://shserver.top:8080/test/users/login', {
        method: 'POST',
        body: JSON.stringify({ uname: username, pass: password }),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const loginData = await res.json();
      setIsLoading(false);

      if (res.ok) {
        console.log({ loginData });
        Cookies.set('ticket', loginData.ticket);
        window.location.href = '/dashboard';
      } else {
        setError('root', { message: loginData?.message });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Flex className="grow">
      <Flex className="grow justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack className="gap-9">
            <Stack className="gap-1">
              <h1 className="text-4xl font-bold text-gray-900">Log in</h1>
              <p className="text-gray-600">
                Welcome back! Please enter your details.
              </p>
            </Stack>
            <Stack className="gap-5">
              <InputField
                id="username"
                error={errors.username?.message}
                label="Username"
                placeholder="Username"
                withAsterisk
                {...register('username')}
              />
              <InputField
                type="password"
                id="password"
                error={errors.password?.message}
                label="Password"
                placeholder="Password"
                withAsterisk
                {...register('password')}
              />
            </Stack>
            <Button type="submit" disabled={!isValid} isLoading={isLoading}>
              Login
            </Button>
            <If condition={Boolean(errors.root?.message)}>
              <div className="flex bg-red-100 px-2 py-3 text-red-600 rounded-md	text-sm ">
                {errors.root?.message}
              </div>
            </If>
          </Stack>
        </form>
      </Flex>
      <div
        className="w-[50%] aspect-[3/8] bg-cover bg-center"
        style={{ backgroundImage: `url('${imgUrl}')` }}
      />
    </Flex>
  );
}
