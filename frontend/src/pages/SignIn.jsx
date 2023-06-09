import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Banner from '../partials/Banner';

function SignIn() {
  const [user,setUser]= useState({
    email:"",password:""
  });
  
  let name,value;
  
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    console.log(name,value);
    setUser({...user, [name]:value});
    // windows.href('/');
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Sign In to your account!</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form action='http://127.0.0.1:5000/form-signin'>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email<span className="text-red-600">*</span></label>
                      <input name ="email" id="email" type="email" className="form-input w-full text-gray-300" placeholder="you@yourcompany.com" required 
                        value = {user.email}
                        onChange = {handleInputs}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password<span className="text-red-600">*</span></label>
                      <input name="password" id="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required 
                        value = {user.password}
                        onChange = {handleInputs}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-400 ml-2">Keep me signed in</span>
                        </label>
                        <Link to="/reset-password" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Forgot Password?</Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button type='submit'className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign in</button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  Don't you have an account? <Link to="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Banner />

    </div>
  );
}

export default SignIn;