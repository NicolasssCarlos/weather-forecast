import type { Units } from '../types/weather';

interface UnitToggleProps {
  units: Units;
  onChange: (units: Units) => void;
  disabled: boolean;
}

export function UnitToggle({ units, onChange, disabled }: UnitToggleProps) {
  return (
    <div className="unit-toggle">
      <button
        className={`unit-btn ${units === 'metric' ? 'active' : ''}`}
        onClick={() => onChange('metric')}
        disabled={disabled}
        type="button"
      >
        °C
      </button>
      <button
        className={`unit-btn ${units === 'imperial' ? 'active' : ''}`}
        onClick={() => onChange('imperial')}
        disabled={disabled}
        type="button"
      >
        °F
      </button>
    </div>
  );
}
