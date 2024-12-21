import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContextProvider';
import { z } from "zod";
import '../App.css';

const UserSchema = z.object({
  email: z.string().email({ message: "Пожалуйста, введите правильный email" }),
  password: z.string()
    .min(8, { message: "Пароль должен содержать минимум 8 символов." })
    .regex(/[A-Z]/, { message: "Пароль должен содержать хотя бы одну заглавную букву." })
    .regex(/[a-z]/, { message: "Пароль должен содержать хотя бы одну строчную букву." })
    .regex(/[0-9]/, { message: "Пароль должен содержать хотя бы одну цифру." }),
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const validateEmailAndPassword = () => {
    try {
      UserSchema.parse({ email, password });
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors.map(e => e.message).join(", "));
      }
      return false;
    }
  };

  const handleLogin = () => {
    if (!validateEmailAndPassword()) return;
    fetch(`http://localhost:5005/users?email=${email}&password=${password}`)
      .then((r) => r.json())
      .then((users) => {
        const user = users[0];
        if (user) {
          userContext.onChange(user); 
          navigate('/home'); 
        } else {
          setError('Неправильный email или пароль');
        }
      });
  }; 
  
  const handleSignUp = () => {
    if (!email || !nickname || !password || !repeatPassword) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
  
    if (password !== repeatPassword) {
      setError('Пароли не совпадают');
      return;
    }
  
    if (!validateEmailAndPassword()) return;
  
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      nickname,
      password,
      createdAt: new Date().toLocaleString(),
    };
  
    fetch(`http://localhost:5005/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((r) => {
        if (r.ok) {
          setIsRegisterMode(false);
          setError('');
        } else {
          setError('Ошибка регистрации. Пользователь может уже существовать.');
        }
      });
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">{isRegisterMode ? 'Регистрация' : 'Вход'}</h1>
        <input
          className={`border ${
            error.includes('email') ? 'border-red-500' : 'border-gray-300'
          } p-2 mb-4 rounded w-full`}
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
        />
        {isRegisterMode && (
          <>
            <input
              className={`border ${
                error.includes('Nickname') ? 'border-red-500' : 'border-gray-300'
              } p-2 mb-4 rounded w-full`}
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError('');
              }}
            />
            <input
              className={`border ${
                error.includes('Пароли не совпадают') || error.includes('пароль') ? 'border-red-500' : 'border-gray-300'
              } p-2 mb-4 rounded w-full`}
              placeholder="Пароль"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
            />
            <input
              className={`border ${
                error.includes('Пароли не совпадают') || error.includes('повторите пароль') ? 'border-red-500' : 'border-gray-300'
              } p-2 mb-4 rounded w-full`}
              placeholder="Повторите пароль"
              type="password"
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
                setError('');
              }}
            />
          </>
        )}
        {!isRegisterMode && (
          <input
            className={`border ${error.includes('пароль') ? 'border-red-500' : 'border-gray-300'} p-2 mb-4 rounded w-full`}
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
          />
        )}
        {isRegisterMode ? (
          <button
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
            onClick={handleSignUp}
          >
            Зарегистрироваться
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
            onClick={handleLogin}
          >
            Войти
          </button>
        )}
        <button
          className="mt-4 text-blue-500 hover:underline"
          onClick={() => setIsRegisterMode(!isRegisterMode)}
        >
          {isRegisterMode ? 'Войти' : 'Зарегистрироваться'}
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  ); 
}
