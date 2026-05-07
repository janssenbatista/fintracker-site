import { DollarSignIcon } from 'lucide-react';

interface Props {
  iconSize?: number;
  textSize?: 'xl' | '2xl' | '3xl' | '4xl';
}

const Logo: React.FC<Props> = ({ iconSize = 24, textSize = '3xl' }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-full bg-green-400 p-2">
        <DollarSignIcon data-testid="logo-icon" color="white" size={iconSize} />
      </div>
      <p data-testid="logo-text" className={`font-bold text-${textSize}`}>
        FinTest
      </p>
    </div>
  );
};

export default Logo;
