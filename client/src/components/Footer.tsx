export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-light">GrittyFlint</h3>
          </div>
          
          <div className="flex items-center space-x-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Vimeo
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              LinkedIn
            </a>
            <p className="text-gray-500 text-sm">
              © 2024 GrittyFlint
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}