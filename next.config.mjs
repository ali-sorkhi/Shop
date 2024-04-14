/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    DB_URI: "mongodb://localhost:27017/shop",
    API: "http://localhost:3000/api",
    NEXTAUTH_SECRET: "hsdfhjbB@DHBi@213whwer23fi@aksnc124",
  },
};

export default nextConfig;
