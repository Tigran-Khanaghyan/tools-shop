import { useState, useRef, useEffect } from 'react';
import { X, CreditCard, Lock, CheckCircle, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface PaymentModalProps {
  onClose: () => void;
  total: number;
}

interface FormState {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  billingAddress: string;
}

interface Errors {
  cardholderName?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  billingAddress?: string;
}

type Status = 'idle' | 'loading' | 'success';

function formatCardNumber(value: string) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
}

export default function PaymentModal({ onClose, total }: PaymentModalProps) {
  const { clearCart } = useCart();
  const [form, setForm] = useState<FormState>({
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    billingAddress: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.cardholderName.trim()) e.cardholderName = 'Name is required';
    const rawCard = form.cardNumber.replace(/\s/g, '');
    if (rawCard.length !== 16) e.cardNumber = 'Enter a valid 16-digit card number';
    const [mm, yy] = form.expiry.split('/');
    const month = parseInt(mm, 10);
    const year = parseInt('20' + yy, 10);
    const now = new Date();
    if (!mm || !yy || month < 1 || month > 12 || year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
      e.expiry = 'Enter a valid expiry date';
    }
    if (form.cvv.length < 3) e.cvv = 'CVV must be 3–4 digits';
    if (!form.billingAddress.trim()) e.billingAddress = 'Billing address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        clearCart();
        onClose();
      }, 2000);
    }, 1500);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current && status === 'idle') onClose();
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-200">
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center p-10 gap-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={36} className="text-green-500" />
            </div>
            <h2
              className="text-2xl font-bold text-gray-900"
              data-qa="payment-successful"
            >
              Payment Successful!
            </h2>
            <p className="text-gray-500">
              Your order has been placed. Thank you for shopping at ToolShop!
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <CreditCard size={20} className="text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Secure Checkout
                </h2>
              </div>
              <button
                onClick={onClose}
                disabled={status === "loading"}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="px-6 py-5 flex flex-col gap-4"
            >
              {/* Total */}
              <div className="bg-blue-50 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-blue-700 font-medium">
                  Total to pay
                </span>
                <span className="text-xl font-bold text-blue-800">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Cardholder Name */}
              <Field label="Cardholder Name" error={errors.cardholderName}>
                <input
                  data-qa="cardholder-name"
                  type="text"
                  placeholder="Jane Doe"
                  value={form.cardholderName}
                  onChange={(e) =>
                    handleChange("cardholderName", e.target.value)
                  }
                  className={inputClass(!!errors.cardholderName)}
                />
              </Field>

              {/* Card Number */}
              <Field label="Card Number" error={errors.cardNumber}>
                <input
                  data-qa="card-number"
                  type="text"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={form.cardNumber}
                  onChange={(e) =>
                    handleChange("cardNumber", formatCardNumber(e.target.value))
                  }
                  className={
                    inputClass(!!errors.cardNumber) +
                    " tracking-widest font-mono"
                  }
                />
              </Field>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Expiry" error={errors.expiry}>
                  <input
                    data-qa="expiry"
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={(e) =>
                      handleChange("expiry", formatExpiry(e.target.value))
                    }
                    className={inputClass(!!errors.expiry)}
                  />
                </Field>
                <Field label="CVV" error={errors.cvv}>
                  <input
                    data-qa="cvv"
                    type="password"
                    inputMode="numeric"
                    placeholder="•••"
                    maxLength={4}
                    value={form.cvv}
                    onChange={(e) =>
                      handleChange(
                        "cvv",
                        e.target.value.replace(/\D/g, "").slice(0, 4),
                      )
                    }
                    className={inputClass(!!errors.cvv)}
                  />
                </Field>
              </div>

              {/* Billing Address */}
              <Field label="Billing Address" error={errors.billingAddress}>
                <input
                  data-qa="billing-address"
                  type="text"
                  placeholder="123 Main St, City, State"
                  value={form.billingAddress}
                  onChange={(e) =>
                    handleChange("billingAddress", e.target.value)
                  }
                  className={inputClass(!!errors.billingAddress)}
                />
              </Field>

              <button
                data-qa="submit-payment"
                type="submit"
                disabled={status === "loading"}
                className="mt-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {status === "loading" ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Pay ${total.toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <Lock size={10} />
                Payments are encrypted and secure
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
    hasError
      ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
  }`;
}
