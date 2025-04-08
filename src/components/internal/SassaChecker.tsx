'use client';

import React, { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

type Outcome = {
  period: string;
  outcome: 'approved' | 'declined' | 'pending';
  reason?: string;
  payday?: string;
};

type SassaResponse = {
  appId: string;
  outcomes: Outcome[];
};

type MockResponse = {
  appId: string;
  outcomes: {
    period: string;
    outcome: 'approved' | 'declined' | 'pending';
    reason?: string;
    payday?: string;
  }[];
};

// Mock data for testing
const mockData: MockResponse = {
  appId: "TEST123",
  outcomes: [
    {
      period: "March 2024",
      outcome: "approved",
      payday: "2024-03-15"
    },
    {
      period: "February 2024",
      outcome: "declined",
      reason: "Income threshold exceeded"
    },
    {
      period: "January 2024",
      outcome: "pending"
    }
  ]
};

export default function SassaChecker() {
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState<SassaResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setResult(null);

    // Input validation
    if (idNumber.length < 13) {
      setErrorMsg('Please enter a valid 13-digit ID number');
      setLoading(false);
      return;
    }

    if (phoneNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number');
      setLoading(false);
      return;
    }

    try {
      // Using mock data for now since the actual API might not be accessible
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResult(mockData);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to check status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setIdNumber('');
    setPhoneNumber('');
    setResult(null);
    setErrorMsg('');
  };

  const renderStatusDescription = (outcome: Outcome) => {
    switch (outcome.outcome) {
      case 'approved':
        return `Your application has been approved. Pay day: ${outcome.payday || 'Not Assigned'}`;
      case 'declined':
        return `Your application has been declined. Reason: ${outcome.reason || 'Unknown'}`;
      case 'pending':
        return 'Your application is still pending.';
    }
  };

  const downloadResult = () => {
    if (!result) return;
    const text = JSON.stringify(result, null, 2);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'sassa_result.txt';
    a.click();
  };

  const shareOnWhatsApp = () => {
    if (!result) return;
    const text = encodeURIComponent(JSON.stringify(result, null, 2));
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] ">
      <div className="w-full  mx-auto ">
        <div className="bg-[#fbbf2c] text-gray-800 p-8 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Input
                  label="ID Number:"
                  id="id_number"
                  type="text"
                  placeholder="Enter your ID Number"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value.replace(/\D/g, '').slice(0, 13))}
                  maxLength={13}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Input
                  label="Phone Number:"
                  id="phone_number"
                  type="tel"
                  placeholder="Enter your Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  maxLength={10}
                  required
                  disabled={loading}
                />
              </div>

              {errorMsg && (
                <div className="bg-[#ffedcc] text-[#b85c00] p-4 rounded-xl font-bold text-center">
                  {errorMsg}
                </div>
              )}

              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Checking...
                    </div>
                  ) : (
                    'Check Status'
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-[#e67e22] text-center mb-6">
                APPLICATION {result.appId}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="bg-[#fbe4b7] p-4 border text-left font-bold">Period</th>
                      <th className="bg-[#fbe4b7] p-4 border text-left font-bold">Status</th>
                      <th className="bg-[#fbe4b7] p-4 border text-left font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.outcomes.map((entry, idx) => {
                      const statusStyles = {
                        approved: 'bg-[#dff0d8] text-[#3c763d]',
                        declined: 'bg-[#f2dede] text-[#a94442]',
                        pending: 'bg-[#fcf8e3] text-[#8a6d3b]',
                      }[entry.outcome];

                      return (
                        <tr key={idx} className={statusStyles}>
                          <td className="p-4 border">{entry.period}</td>
                          <td className="p-4 border capitalize">{entry.outcome}</td>
                          <td className="p-4 border">{renderStatusDescription(entry)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap gap-4 justify-center mt-6">
                <Button onClick={downloadResult}>
                  Download Result
                </Button>
                <Button onClick={shareOnWhatsApp} variant="whatsapp">
                  Share on WhatsApp
                </Button>
                <Button onClick={resetForm} variant="dark">
                  Check Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
