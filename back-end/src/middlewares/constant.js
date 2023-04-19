const accessCors = [
    { url: '/api/v1/auth/google', method: ['GET'] },
    { url: '/api/v1/auth/login', method: ['POST'] },
    { url: '/api/v1/auth/google_login', method: ['POST'] },
    { url: '/api/v1/auth/register', method: ['POST'] },
]
module.exports = accessCors;