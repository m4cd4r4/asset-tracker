import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { storage } from '@/services/storage';

interface SANInputModalProps {
  quantity: number;
  operation: 'add' | 'subtract';
  itemName: string;
  onSubmit: (sanNumbers: string[]) => void;
  onCancel: () => void;
}

export function SANInputModal({ quantity, operation, itemName, onSubmit, onCancel }: SANInputModalProps) {
  const [sanNumbers, setSanNumbers] = useState<string[]>(Array(quantity).fill(''));
  const [errors, setErrors] = useState<string[]>(Array(quantity).fill(''));

  const validateSAN = (san: string, index: number): boolean => {
    const newErrors = [...errors];

    if (!/^\d{5,6}$/.test(san)) {
      newErrors[index] = 'Must be 5-6 digits';
      setErrors(newErrors);
      return false;
    }

    if (operation === 'add' && !storage.isSANUnique(san)) {
      newErrors[index] = 'SAN already exists';
      setErrors(newErrors);
      return false;
    }

    if (operation === 'subtract') {
      const records = storage.getSANRecords();
      const record = records.find(r => r.sanNumber === san);
      if (!record) {
        newErrors[index] = 'SAN not found';
        setErrors(newErrors);
        return false;
      }
      if (record.item !== itemName) {
        newErrors[index] = `Belongs to ${record.item}`;
        setErrors(newErrors);
        return false;
      }
    }

    // Check for duplicates in current input
    if (sanNumbers.filter((s, i) => s === san && i !== index).length > 0) {
      newErrors[index] = 'Duplicate SAN';
      setErrors(newErrors);
      return false;
    }

    newErrors[index] = '';
    setErrors(newErrors);
    return true;
  };

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    const cleaned = value.replace(/\D/g, '').slice(0, 6);
    const newSanNumbers = [...sanNumbers];
    newSanNumbers[index] = cleaned;
    setSanNumbers(newSanNumbers);

    if (cleaned.length >= 5) {
      validateSAN(cleaned, index);
    }
  };

  const handleSubmit = () => {
    // Validate all
    let allValid = true;
    sanNumbers.forEach((san, index) => {
      if (!validateSAN(san, index)) {
        allValid = false;
      }
    });

    if (allValid && sanNumbers.every(san => san.length >= 5)) {
      onSubmit(sanNumbers);
    }
  };

  const allFilled = sanNumbers.every(san => san.length >= 5);
  const hasErrors = errors.some(e => e !== '');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {operation === 'add' ? 'Add' : 'Remove'} {itemName}
          </h2>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <p className="text-sm text-gray-600">
            Enter {quantity} SAN number{quantity > 1 ? 's' : ''} (5-6 digits)
          </p>

          {sanNumbers.map((san, index) => (
            <div key={index}>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 w-8">#{index + 1}</span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={san}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder="Enter SAN"
                  className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors[index] ? 'border-red-300 bg-red-50' : ''
                  }`}
                  autoFocus={index === 0}
                />
                {san.length >= 5 && !errors[index] && (
                  <Check className="w-5 h-5 text-green-500" />
                )}
              </div>
              {errors[index] && (
                <p className="text-sm text-red-500 mt-1 ml-10">{errors[index]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!allFilled || hasErrors}
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
