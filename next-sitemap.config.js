/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://taishi-hamasaki-portfolio.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  // priorityやchangefreqなどのオプションも追加できます
  changefreq: 'daily',
  priority: 0.7,
};
