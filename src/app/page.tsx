import { headers } from 'next/headers';

// Helper component for consistent row styling
const InfoRow = ({ label, value }: { label: string; value: string | null }) => (
  <div className="flex flex-col sm:flex-row sm:items-baseline py-2">
    <span className="text-neutral-400 font-medium w-full sm:w-40 shrink-0 mb-1 sm:mb-0 text-sm sm:text-base">
      {label}
    </span>
    <span className="text-neutral-200 break-all text-sm sm:text-base">
      {value || <span className="text-neutral-500 italic">Not available</span>}
    </span>
  </div>
);

// This is an async Server Component
async function IpLoggerPage() {
  const headersList = await headers();

  // Standard headers to check for IP address
  const forwardedFor = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  const remoteAddr = headersList.get('remote-addr'); // This is often the IP of the immediate upstream proxy

  let clientIp: string | null = null;

  if (forwardedFor) {
    clientIp = forwardedFor.split(',')[0].trim();
  } else if (realIp) {
    clientIp = realIp.trim();
  }
  // If neither x-forwarded-for nor x-real-ip is present, clientIp remains null.
  // remoteAddr is listed but not typically used for client IP determination in this logic.

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 font-sans flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8 sm:mb-10">
          Client IP Details
        </h1>

        <div className="bg-neutral-900 border border-neutral-700 rounded-md shadow-xl p-6 sm:p-8 mb-8">
          <div className="space-y-2 divide-y divide-neutral-800">
            <InfoRow label="x-forwarded-for:" value={forwardedFor} />
            <InfoRow label="x-real-ip:" value={realIp} />
            <InfoRow label="socket remote-addr:" value={remoteAddr} />

            {/* Derived Client IP Section */}
            <div className="pt-4 sm:pt-6 mt-2 sm:mt-4"> {/* Ensure this div is part of the flow for divide-y or handle manually */}
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="text-neutral-300 font-semibold w-full sm:w-40 shrink-0 mb-1 sm:mb-0 text-sm sm:text-base">
                  Derived Client IP:
                </span>
                <span className="text-white font-bold text-lg sm:text-xl break-all">
                  {clientIp || <span className="text-neutral-400 font-medium">IP Not Found</span>}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-800/70 border border-neutral-700 rounded-md p-4 text-center">
          <p className="text-neutral-400 text-xs sm:text-sm">
            This page displays IP address information as detected by the server.
            The "Derived Client IP" is the most likely public IP address of the client.
          </p>
        </div>
      </div>
    </div>
  );
}

export default IpLoggerPage;