import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Copy } from 'lucide-react';
import { useTOTPState } from './useTOTPState';

export function TOTPGenerator() {
  const { key, totp, copyToClipboard, setKey, timeLeft } = useTOTPState();

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>TOTP Generator</CardTitle>
        <CardDescription>
          Enter your key to generate a Time-based One-Time Password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="key"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Secret Key
            </label>
            <Input
              type="text"
              id="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter your secret key"
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="totp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Generated TOTP
            </label>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                id="totp"
                value={totp}
                readOnly
                className="w-full"
              />
              <Button
                className="bg-sky-500 hover:bg-sky-600 dark:bg-white
                text-white"
                onClick={copyToClipboard}
                disabled={!totp || totp === 'Invalid key'}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              {totp && `Time until next TOTP: ${timeLeft} seconds`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
