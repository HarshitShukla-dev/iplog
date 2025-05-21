import { headers } from 'next/headers';

// This is an async Server Component
async function IpLoggerPage() {
  const headersList = await headers();

  // Standard headers to check for IP address
  const forwardedFor = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  const remoteAddr = headersList.get('remote-addr');

  let clientIp: string | null = null;

  if (forwardedFor) {
    clientIp = forwardedFor.split(',')[0].trim();
  } else if (realIp) {
    clientIp = realIp.trim();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">IP Logger Page</h1>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-300 mb-4">Client IP Information</h2>

          <div className="space-y-3">
            <p className="flex">
              <span className="text-green-400 font-medium w-36">x-forwarded-for:</span>
              <span className="text-gray-300">{forwardedFor || 'Not available'}</span>
            </p>

            <p className="flex">
              <span className="text-green-400 font-medium w-36">x-real-ip:</span>
              <span className="text-gray-300">{realIp || 'Not available'}</span>
            </p>

            <p className="flex">
              <span className="text-green-400 font-medium w-36">remote-addr:</span>
              <span className="text-gray-300">{remoteAddr || 'Not available'}</span>
            </p >

            <p className="flex">
              <span className="text-green-400 font-medium w-36">Derived Client IP:</span>
              <span className="text-gray-300 font-bold">{clientIp || 'IP Not Found'}</span>
            </p >
          </div >
        </div >

        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
          <p className="text-blue-200 text-sm">
            This page displays your IP address information detected by the server.
          </p>
        </div>
      </div >
    </div >
  );
}

export default IpLoggerPage;