"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type InquiryContextValue = {
  isOpen: boolean;
  openInquiry: () => void;
  closeInquiry: () => void;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openInquiry = useCallback(() => setIsOpen(true), []);
  const closeInquiry = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openInquiry, closeInquiry }),
    [isOpen, openInquiry, closeInquiry],
  );

  return (
    <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>
  );
}

export function useInquiry() {
  const ctx = useContext(InquiryContext);
  if (!ctx) {
    throw new Error("useInquiry must be used within InquiryProvider");
  }
  return ctx;
}
