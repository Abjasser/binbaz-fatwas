/** Represents a single Fatwa (Islamic ruling) from Sheikh Ibn Baz */
export interface Fatwa {
  /** Unique 1-based identifier */
  id: number;
  /** Arabic title of the fatwa */
  title: string;
  /** The question posed to the Sheikh */
  question: string;
  /** The Sheikh's answer/ruling */
  answer: string;
}

/** API response from /api/fatwa/random */
export interface FatwaResponse {
  fatwa: Fatwa;
  /** 1-based position of this fatwa in the collection */
  index: number;
  /** Total number of fatwas in the collection */
  total: number;
}

/** Toast notification types */
export type ToastType = 'success' | 'error' | 'info';

/** State for the toast notification */
export interface ToastState {
  message: string;
  type: ToastType;
}
