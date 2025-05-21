import { headers } from 'next/headers';

// This is an async Server Component
async function IpLoggerPage() {
    const headersList = await headers();

    // Standard headers to check for IP address.
    // 'x-forwarded-for' can contain a list of IPs if the request passed through multiple proxies.
    // The first IP in the list is usually the client's IP.
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip'); // Often set by reverse proxies like Nginx
    const remoteAddr = headersList.get('remote-addr'); // May be the IP of the last proxy or the client

    let clientIp: string | null = null;

    if (forwardedFor) {
        clientIp = forwardedFor.split(',')[0].trim();
    } else if (realIp) {
        clientIp = realIp.trim();
    } else {
        // 'remote-addr' is not directly available in `next/headers` in this manner for server components.
        // In edge environments, `request.ip` might be available on an incoming `NextRequest` object.
        // For standard server components, 'x-forwarded-for' or 'x-real-ip' (if your proxy sets it) are more reliable.
        // If running directly on Node.js without a reverse proxy in front that sets x-forwarded-for,
        // this might be trickier directly from `next/headers`.
        // However, for typical deployments (Vercel, Docker with a proxy), x-forwarded-for is common.
        console.log("'remote-addr' is not directly available via headers() in this context, rely on x-forwarded-for or x-real-ip.");
    }

    console.log('--- Client IP Information ---');
    console.log('x-forwarded-for:', forwardedFor);
    console.log('x-real-ip:', realIp);
    console.log('Derived Client IP:', clientIp || 'IP Not Found');
    console.log('remote-addr:', remoteAddr);
    console.log('---------------------------');

    return (
        <div>
            <h1>IP Logger Page</h1>
            <p>Check the server console for the logged IP address.</p>
            {clientIp && <p>Detected IP (for demo purposes, primarily from x-forwarded-for): {clientIp}</p>}
        </div>
    );
}

export default IpLoggerPage;