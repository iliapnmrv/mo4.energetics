const nextConfig = {
    basePath: '/energetics',
    async redirects() {
        return [{
            source: '/',
            destination: '/energetics',
            basePath: false,
            permanent: true
        }]
    }
}

module.exports = nextConfig