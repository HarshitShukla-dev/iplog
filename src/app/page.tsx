import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

const InfoRow = ({ label, value }: { label: string; value: string | null }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-3 border-b border-neutral-800 last:border-none">
    <div className="text-neutral-400 font-medium text-sm sm:text-base">{label}</div>
    <div className="text-neutral-200 break-all text-sm sm:text-base">
      {value || <span className="text-neutral-500 italic">Not available</span>}
    </div>
  </div>
);

async function IpLoggerPage(req: NextRequest) {
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  const remoteAddr = headersList.get('remote-addr');
  const ipAddress = headersList.get('ip');

  let clientIp: string | null = null;

  if (forwardedFor) {
    clientIp = forwardedFor.split(',')[0].trim();
  } else if (realIp) {
    clientIp = realIp.trim();
  } else if (ipAddress) {
    clientIp = ipAddress.trim();
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-center text-white">
            Client IP Details
          </h1>
          <p className="mt-2 text-center text-sm text-neutral-500">
            Here's what we know about your IP address.
          </p>
        </div>
        <div className="bg-neutral-900 rounded-lg shadow-xl overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <InfoRow label="x-forwarded-for:" value={forwardedFor} />
            <InfoRow label="x-real-ip:" value={realIp} />
            <InfoRow label="socket remote-addr:" value={remoteAddr} />
            <InfoRow label="req.socket remoteAddress:" value={ipAddress} />
            <div className="pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="text-neutral-300 font-semibold text-sm sm:text-base">
                  Derived Client IP:
                </div>
                <div className="text-white font-bold text-lg sm:text-xl break-all">
                  {clientIp || <span className="text-neutral-400 font-medium">IP Not Found</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-neutral-600 text-xs">
          This page displays IP address information as detected by the server. The "Derived Client IP" is the most likely public IP address of the client.
        </p>
      </div>
    </div>
  );
}

export default IpLoggerPage;
