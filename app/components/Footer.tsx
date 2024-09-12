// components/Footer.tsx
const Footer = () => (
  <footer className="bg-dark text-light py-4 text-center">
    <div className="container">
      <p>&copy; {new Date().getFullYear()} UltimateFileConverter. All Rights Reserved.</p>
      <p>
        Follow us on
        <a href="https://facebook.com/ultimatefileconverter" className="text-light mx-2" target="_blank" rel="noopener noreferrer">Facebook</a> |
        <a href="https://twitter.com/ultimatefileconv" className="text-light mx-2" target="_blank" rel="noopener noreferrer">Twitter</a> |
        <a href="https://instagram.com/ultimatefileconverter" className="text-light mx-2" target="_blank" rel="noopener noreferrer">Instagram</a>
      </p>
    </div>
  </footer>
);

export default Footer;
