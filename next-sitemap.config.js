/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://careerplanet.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      // Add any additional sitemaps here if needed
    ],
  },
  exclude: ["/api/*", "/admin/*"],
  changefreq: "daily",
  priority: 0.7,
};
