import React from "react";

type TProps = {
  isLoading: boolean;
  loadingFallback: React.ReactElement;
  loadingCount?: number;
  children: React.ReactNode;
};

/**
 * Kasih loading skeleton biar ux nya GG
 * `loadingCount` buat ngasih tau mau kasih brp banyak `loadingFallback`
 */
const LoadingState: React.FC<TProps> = ({
  isLoading,
  loadingFallback,
  loadingCount = 1,
  children,
}) => {
  return (
    <>
      {isLoading
        ? [...Array(loadingCount)].map((_, idx) => (
            <React.Fragment key={idx}>{loadingFallback}</React.Fragment>
          ))
        : children}
    </>
  );
};

export default LoadingState;
