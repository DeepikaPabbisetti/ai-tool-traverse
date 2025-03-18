
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AI Tool Hub</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your comprehensive resource for discovering the best AI tools across various categories.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Trending Tools
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  AI News
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/generative-ai" className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Generative AI
                </Link>
              </li>
              <li>
                <Link to="/categories/machine-learning" className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link to="/categories/nlp" className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Natural Language Processing
                </Link>
              </li>
              <li>
                <Link to="/categories/computer-vision" className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Computer Vision
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} AI Tool Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
