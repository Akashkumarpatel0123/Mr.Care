import React from 'react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="bg-gray-100 py-3 px-4 md:px-8">
      <ol className="flex flex-wrap text-sm">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              <a 
                href={item.href} 
                className="text-gray-600 hover:text-[#00A0A0]"
              >
                {item.label}
              </a>
            </li>
            {index < items.length - 1 && (
              <li className="mx-2">{'>'}</li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;