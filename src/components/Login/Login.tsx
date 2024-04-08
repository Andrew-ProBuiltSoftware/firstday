import React, { useState } from 'react';
import Button from '../common/Button';
import axios from 'axios';
import { ILoginBody } from '../TimeClock/TimeClock.types';
import { useUserContext } from '../../context/AppContext';
import { default as ProBuiltLogo } from '../../assets/pb-image.png';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { setIsUserLoggedIn, setUserCreds } = useUserContext();

  const loginBody: ILoginBody = {
    email: email,
    password: password,
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const baseURI = import.meta.env.VITE_BASE_URI;
    const loginUrl: string = `${baseURI}/v3/PTOLogin/AuthenticateUser`;
    axios
      .post(loginUrl, loginBody)
      .then((response) => {
        setUserCreds({
          id: response.data.data.ID || 1,
          token: response.data.data.token,
          email: email,
        });
        setIsUserLoggedIn(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#212121]">
      <div className="h-auto w-auto px-8 pb-8 rounded-md">
        {/* Logo */}
        <div className="w-[300px] mb-10">
          <img src={ProBuiltLogo} alt="Logo" />
        </div>
        {/* Email Address Field */}
        <div className="mb-1 w-full flex items-center justify-center">
          <label
            htmlFor="email"
            className="block text-gray-600 text-sm font-semibold mb-2"
          />
          <input
            placeholder="Email Address"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChangeEmail}
            className="w-64 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-slate-300"
          />
        </div>
        {/* Password Field */}
        <div className="mb-4 w-full flex items-center justify-center">
          <label
            htmlFor="password"
            className="block text-gray-600 text-sm font-semibold mb-2"
          />
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
            className="w-64 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-slate-300"
          />
        </div>
        {/* Login Button */}
        <div className="mb-4 w-full flex items-center justify-center">
          <Button label="Login" onClick={() => handleLogin()} />
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from 'react';
// import Button from '../common/Button';
// import axios from 'axios';
// import { ILoginBody } from '../TimeClock/TimeClock.types';
// import { useUserContext } from '../../context/AppContext';
// import { default as ProBuiltLogo } from '../../assets/pb-image.png';
// import { Input } from '@progress/kendo-react-inputs';
// import { Validator, RequiredValidator } from '@progress/kendo-react-validators';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [formError, setFormError] = useState('');
//   const { setIsUserLoggedIn, setUserCreds } = useUserContext();

//   const handleLogin = () => {
//     const loginBody: ILoginBody = { email, password };
//     const loginUrl =
//       'https://api.mtillholdings.com/v3/PTOLogin/AuthenticateUser';

//     axios
//       .post(loginUrl, loginBody)
//       .then((response) => {
//         const { data } = response.data;
//         setUserCreds({ id: data.ID || 1, token: data.token, email });
//         setIsUserLoggedIn(true);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         setFormError('Invalid email or password.');
//       });
//   };

//   const validateForm = () => {
//     if (!email || !password) {
//       setFormError('Please fill in all fields.');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       handleLogin();
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-[#212121]">
//       <div className="h-auto w-auto px-8 pb-8 rounded-md">
//         {/* Logo */}
//         <div className="w-[300px] mb-10">
//           <img src={ProBuiltLogo} alt="Logo" />
//         </div>
//         {/* Login Form */}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4 w-full flex items-center justify-center">
//             <label htmlFor="email">Email</label>
//             <Input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Validator
//               rules={[
//                 { validate: RequiredValidator, message: 'Email is required' },
//               ]}
//             />
//           </div>
//           <div className="mb-4 w-full flex items-center justify-center">
//             <label htmlFor="password">Password</label>
//             <Input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Validator
//               rules={[
//                 {
//                   validate: RequiredValidator,
//                   message: 'Password is required',
//                 },
//               ]}
//             />
//           </div>
//           <div className="mb-4 w-full flex items-center justify-center">
//             <Button label="Login" type="submit" />
//           </div>
//           {formError && <div className="text-red-500">{formError}</div>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
