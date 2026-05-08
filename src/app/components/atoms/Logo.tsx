import { Film } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Film className="size-6" />
      <span>CineApp</span>
    </div>
  );
}
