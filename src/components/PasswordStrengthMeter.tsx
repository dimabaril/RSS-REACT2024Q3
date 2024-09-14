import React from "react";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
}) => {
  const calculateStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]/.test(password)) strength += 1;
    return strength;
  };

  const strength = calculateStrength(password);

  return (
    <div className="password-strength-meter">
      <progress value={strength} max="5" />
    </div>
  );
};

export default PasswordStrengthMeter;
