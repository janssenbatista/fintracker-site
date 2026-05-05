import { DollarSignIcon } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <div className="rounded-full bg-green-400/60 p-2">
        <DollarSignIcon data-testid="logo-icon" size={32} />
      </div>
      <p data-testid="logo-text" className="text-4xl font-bold text-green-400">
        Fin<span className="text-black">Tracker</span>
      </p>
    </div>
  );
};

export default Logo;
