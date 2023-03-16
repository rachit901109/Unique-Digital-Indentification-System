import React,{useState} from 'react';
import { Link } from 'react-router-dom';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Banner from '../partials/Banner';

function SignUp() {
  const [user,setUser]= useState({
    full_name:"",email:"",password:"",re_password:""
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
                <h1 className="h1">Welcome. We exist to make entrepreneurship easier.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form action="http://127.0.0.1:5000/form-signup">
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="full-name">Full Name <span className="text-red-600">*</span></label>
                      <input name="full_name" id="full-name" type="text" className="form-input w-full text-gray-300" placeholder="First name" required 
                      value = {user.full_name}
                      onChange = {handleInputs}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="company-name">Email <span className="text-red-600">*</span></label>
                      <input name="email" id="company-name" type="text" className="form-input w-full text-gray-300" placeholder="Email" required 
                      value = {user.email}
                      onChange = {handleInputs}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Password <span className="text-red-600">*</span></label>
                      <input name="password" id="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required 
                      value = {user.password}
                      onChange = {handleInputs}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Re-enter password <span className="text-red-600">*</span></label>
                      <input name="re_password" id="re_password" type="password" className="form-input w-full text-gray-300" placeholder="Re-enter password" required 
                      value = {user.re_password}
                      onChange = {handleInputs}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 text-center">
                    I agree to be contacted by Open PRO about this offer as per the Open PRO <Link to="#" className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out">Privacy Policy</Link>.
                                </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign up</button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  Already have an account? <Link to="signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign in</Link>
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

export default SignUp;