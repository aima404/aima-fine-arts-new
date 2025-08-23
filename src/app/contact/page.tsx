import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const contact = [
  {
    icon: <FaInstagram size={90} className='p-5 md:p-0' />,
    handle: "@aimafinearts",
    link: "https://instagram.com/aimafinearts"
  },
  {
    icon: <FaFacebook size={90} className='p-5 md:p-0' />,
    handle: "@aimafinearts",
    link: "https://facebook.com/aimafinearts"
  },
  {
    icon: <Mail size={90} className='p-5 md:p-0' />,
    handle: "aimafinearts@gmail.com",
    link: "mailto:aimafinearts@gmail.com"
  }
];

export default function Contact() {
  return (
     <div className="items-center justify-items-center min-h-screen py-10 md:py-14 md:px-14">
        <h1 className="text-3xl md:text-5xl">contact</h1>
        <div className="flex flex-col lg:flex-row p-4 lg:p-20 w-full items-center">
          <div className="w-full lg:w-1/2 flex flex-col md:gap-8 mb-10 lg:mb-0">
            {contact.map((contactItem, index) => (
              <div key={index} className="flex items-center gap-2 md:gap-6 lg:gap-10">
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
          <ContactForm />
        </div>
    </div>
  );
}