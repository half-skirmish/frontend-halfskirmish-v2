const Footer = () => {
    return (
      <footer className="bg-gray-900 text-center text-white py-8 z-30 w-full max-w-[100vw] overflow-x-hidden">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Half Skirmish. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
