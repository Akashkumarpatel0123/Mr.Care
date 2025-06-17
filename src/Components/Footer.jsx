import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    about: [
      { label: 'Legacy', href: '/legacy' },
      { label: 'Leadership', href: '/leadership' },
      { label: 'Vision', href: '/vision' },
      { label: 'Our Pillars', href: '/pillars' },
      { label: 'Awards', href: '/awards' },
    ],
    services: [
      { label: 'Long Term Care', href: '/long-term-care' },
      { label: 'Home Visit', href: '/home-visit' },
      { label: 'Medical Equipments', href: '/medical-equipments' },
      { label: 'Adult Vaccination', href: '/adult-vaccination' },
      { label: 'Home Diagnostics', href: '/home-diagnostics' },
    ],
    partners: [
      { label: 'Corporates', href: '/corporates' },
      { label: 'Doctors', href: '/doctors' },
    ],
    careers: [

      { label: 'Career in Mr.Care', href: '/careers/homecare' },
      { label: 'Life at Mr.Care', href: '/careers/life' },
      { label: 'Hiring Process', href: '/careers/hiring-process' },
    ],
    news: [
      { label: 'Press Releases', href: '/press' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Journals', href: '/journals' },
      { label: 'Blogs', href: '/blogs' },
      { label: 'Campaigns', href: '/campaigns' },
    ],
  };

  const cities = [
    'HYDERABAD', 'KOLKATA', 'DELHI NCR', 'CHENNAI', 'BANGALORE',
    'PUNE', 'MADURAI', 'MYSORE', 'INDORE', 'MUMBAI', 'GUWAHATI'
  ];

  return (
    <footer className="bg-[#8D2E7D] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-2">
          {/* About Section */}
          <div className="w-full md:w-1/5 px-2 mb-6">
            <h3 className="text-sm font-bold mb-3 uppercase">About</h3>
            <ul className="space-y-1.5">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-xs text-gray-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div className="w-full md:w-1/5 px-2 mb-6">
            <h3 className="text-sm font-bold mb-3 uppercase">Our Services</h3>
            <ul className="space-y-1.5">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-xs text-gray-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner Section */}
          <div className="w-full md:w-1/5 px-2 mb-6">
            <h3 className="text-sm font-bold mb-3 uppercase">Partner with us</h3>
            <ul className="space-y-1.5">
              {footerLinks.partners.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-xs text-gray-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Careers Section */}
          <div className="w-full md:w-1/5 px-2 mb-6">
            <h3 className="text-sm font-bold mb-3 uppercase">Careers</h3>
            <ul className="space-y-1.5">
              {footerLinks.careers.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-xs text-gray-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* News Section */}
          <div className="w-full md:w-1/5 px-2 mb-6">
            <h3 className="text-sm font-bold mb-3 uppercase">News & Media</h3>
            <ul className="space-y-1.5">
              {footerLinks.news.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-xs text-gray-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col space-y-2">
              <button className="bg-[#FF7043] text-white px-4 py-2 rounded-full text-xs font-medium">
                SHARE A FEEDBACK
              </button>
              <button className="bg-[#FF7043] text-white px-4 py-2 rounded-full text-xs font-medium">
                DOWNLOAD BOOKLET
              </button>
            </div>

            <div className="mt-4 flex space-x-3">
              <a href="#" className="text-white hover:text-[#FF7043]">
                <Facebook size={16} />
              </a>
              <a href="#" className="text-white hover:text-[#FF7043]">
                <Twitter size={16} />
              </a>
              <a href="#" className="text-white hover:text-[#FF7043]">
                <Instagram size={16} />
              </a>
              <a href="#" className="text-white hover:text-[#FF7043]">
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="mb-3">
            <span className="text-xs font-bold mr-3">CONTACT US:</span>
            {cities.map((city, index) => (
              <span key={index} className="inline-block text-xs mr-3 mb-1">{city}</span>
            ))}
          </div>

          <div className="flex flex-wrap">
            <Link to="/terms" className="mr-4 mb-1 text-xs text-gray-300 hover:text-white">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="mr-4 mb-1 text-xs text-gray-300 hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/charter" className="mr-4 mb-1 text-xs text-gray-300 hover:text-white">
              Patient Charter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
