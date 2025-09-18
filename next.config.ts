/** @type {import('next').NextConfig} */
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "guxjrpmkhkmptukolbxk.supabase.co",
        // Optionally, you can add these:
        // port: '',
        // pathname: '/property-images/**',
      },
    ],
  },
};
