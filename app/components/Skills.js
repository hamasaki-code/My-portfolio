import { SiRuby, SiFlutter, SiUnity } from 'react-icons/si';
import { FaJsSquare, FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt } from 'react-icons/fa';

export default function Skills() {
  return (
    <section id="skills" className="my-16">
      <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">Skills & Technologies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
        {/* 技術スキルセクション */}
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          <SiRuby className="text-red-500 w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-black dark:text-white">Ruby on Rails</h3>
          <p className="text-gray-700 dark:text-gray-300">MVC, RESTful API</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          <FaJsSquare className="text-yellow-500 w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-black dark:text-white">JavaScript</h3>
          <p className="text-gray-700 dark:text-gray-300">ES6, TypeScript</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          <FaReact className="text-blue-500 w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-black dark:text-white">React</h3>
          <p className="text-gray-700 dark:text-gray-300">Hooks, Context API</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          <FaNodeJs className="text-green-500 w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-black dark:text-white">Node.js</h3>
          <p className="text-gray-700 dark:text-gray-300">Express.js, REST APIs</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          <FaGitAlt className="text-orange-500 w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-black dark:text-white">Git & GitHub</h3>
          <p className="text-gray-700 dark:text-gray-300">Version Control</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          <FaHtml5 className="text-orange-600 w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-black dark:text-white">HTML5</h3>
          <p className="text-gray-700 dark:text-gray-300">Semantic HTML</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          <FaCss3Alt className="text-blue-500 w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-black dark:text-white">CSS3</h3>
          <p className="text-gray-700 dark:text-gray-300">Responsive Design</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          <SiFlutter className="text-blue-400 w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-black dark:text-white">Flutter</h3>
          <p className="text-gray-700 dark:text-gray-300">Cross-platform</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          <SiUnity className="text-gray-800 w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-black dark:text-white">Unity</h3>
          <p className="text-gray-700 dark:text-gray-300">Game Development</p>
        </div>
      </div>
    </section>
  );
}