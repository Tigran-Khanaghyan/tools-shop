import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, CreditCard as Edit3, Save, X, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AccountPage() {
  const { user, updateUser, isLoading, error, clearError } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: user?.address ?? '',
  });

  useEffect(() => {
    if (user) {
      setForm({ 
        name: user.name, 
        email: user.email, 
        phone: user.phone || '', 
        address: user.address || '' 
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    clearError();
    const success = await updateUser({ 
      ...user, 
      name: form.name,
      phone: form.phone,
      address: form.address,
    });
    if (success) {
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleCancel = () => {
    if (user) setForm({ 
      name: user.name, 
      email: user.email, 
      phone: user.phone || '', 
      address: user.address || '' 
    });
    setEditing(false);
    clearError();
  };

  const fields = [
    { key: 'name' as const, label: 'Full Name', icon: <User size={16} />, type: 'text', placeholder: 'Your name', editable: true },
    { key: 'email' as const, label: 'Email Address', icon: <Mail size={16} />, type: 'email', placeholder: 'you@example.com', editable: false },
    { key: 'phone' as const, label: 'Phone Number', icon: <Phone size={16} />, type: 'tel', placeholder: '+1 (555) 000-0000', editable: true },
    { key: 'address' as const, label: 'Shipping Address', icon: <MapPin size={16} />, type: 'text', placeholder: '123 Main St, City, State', editable: true },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
        <p className="text-gray-500 mt-1 text-sm">Manage your profile and shipping information</p>
      </div>

      {/* Avatar + Name Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-blue-600">
            {(user?.name || 'U').charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900">{user?.name || 'User'}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        {saved && (
          <div className="ml-auto flex items-center gap-1.5 text-green-600 text-sm font-medium">
            <CheckCircle size={16} />
            Saved
          </div>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Profile Information</h2>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Edit3 size={14} />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <X size={14} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-1 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors disabled:bg-blue-400"
              >
                {isLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                Save
              </button>
            </div>
          )}
        </div>

        <div className="divide-y divide-gray-50">
          {fields.map(({ key, label, icon, type, placeholder, editable }) => (
            <div key={key} className="px-6 py-4 flex items-start gap-3">
              <div className="mt-0.5 text-gray-400 flex-shrink-0">{icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
                {editing && editable ? (
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors"
                  />
                ) : (
                  <p className={`text-sm ${form[key] ? 'text-gray-900' : 'text-gray-400 italic'}`}>
                    {form[key] || placeholder}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
