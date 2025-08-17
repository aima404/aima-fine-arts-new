import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { Mail } from 'lucide-react';

const contact = [
  {
    icon: <FaInstagram size={90}/>,
    handle: "@aimafinearts",
    link: "https://instagram.com/aimafinearts"
  },
  {
    icon: <FaFacebook size={90}/>,
    handle: "@aimafinearts",
    link: "https://facebook.com/aimafinearts"
  },
  {
    icon: <Mail size={90}/>,
    handle: "aimafinearts@gmail.com",
    link: "mailto:aimafinearts@gmail.com"
  }
];

export default function Contact() {
  return (
     <div className="items-center justify-items-center min-h-screen p-14">
        <h1 className="text-5xl">contact</h1>
        <div className="flex flex-col lg:flex-row p-4 lg:p-20 w-full items-center">
          <div className="w-full lg:w-1/2 flex flex-col gap-8 mb-10 lg:mb-0">
            {contact.map((contactItem, index) => (
              <div key={index} className="flex items-center gap-6 lg:gap-10">
                <a
                  href={contactItem.link}
                  className="flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contactItem.icon}
                </a>
                <h2 className="text-xl md:text-3xl">{contactItem.handle}</h2>
              </div>
            ))}
          </div>
          <form className="w-full lg:w-1/2 space-y-6" action="#" method="POST">   
          <div className="flex flex-row gap-6 w-full"> 
            <div className="w-1/2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6"
              >
                first name <sup className="text-lg text-red-500"> *</sup>
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="name"
                  placeholder="first name"
                  autoComplete="firstName"
                  required
                  className="border border-middlegray block w-full rounded-md py-1.5 px-3 
                            shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
              </div>
            </div>

            <div className="w-1/2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6"
              >
                last name <sup className="text-lg text-red-500"> *</sup>
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="name"
                  placeholder="last name"
                  autoComplete="lastName"
                  required
                  className="border border-middlegray block w-full rounded-md py-1.5 px-3
                            shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
              </div>
            </div>
          </div> 

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6"
              >
                email address <sup className="text-lg text-red-500"> *</sup>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email address"
                  autoComplete="email"
                  required
                  className="border border-middlegray block w-full rounded-md py-1.5 px-3
                            shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  message <sup className="text-lg text-red-500"> *</sup>
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  id="message"
                  name="message"
                  placeholder="enter your question or message here..."
                  required
                  className="border border-middlegray block w-full rounded-md py-1.5 px-3
                  shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="items-center justify-center bg-sage px-10 py-5 text-xl text-white shadow-sm hover:bg-foreground transition-all duration-300 rounded-xl"
              >
                submit
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}