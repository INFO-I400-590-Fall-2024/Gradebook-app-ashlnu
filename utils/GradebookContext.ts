import {createContext, Dispatch, SetStateAction} from 'react';

interface Thresholds {
  APlus: number;
  A: number;
  B: number;
  C: number;
}

interface GradebookContextType {
  thresholds: Thresholds;
  setThresholds: Dispatch<SetStateAction<Thresholds>>;
}

export const GradebookContext = createContext<GradebookContextType | null>(
  null,
);
