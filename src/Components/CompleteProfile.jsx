import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function CompleteProfile() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    gender: "",
  });

  const navigate = useNavigate();

  // Step 1: Get name from Firebase user
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setFormData((prev) => ({ ...prev, fullName: user.displayName || "" }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ TODO: Save formData to backend or Firestore
    console.log("Submitted", formData);
    navigate("/Home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow space-y-4">
        {step === 1 && (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-semibold">Welcome!</h2>
            <p className="text-gray-700 text-lg">Hello, <strong>{formData.fullName}</strong></p>
            <button
              onClick={handleNext}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  required
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  required
                />
                Female
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Submit & Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
