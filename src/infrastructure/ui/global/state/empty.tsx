import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import React from "react";

interface IProps<T> {
  data: T | undefined | null;
  customErrorTitle?: string;
  customErrorMessage?: string;
  customClass?: string;
}

const EmptyState = <T,>(props: IProps<T> & { children: React.ReactNode }) => {
  return (
    <>
      {props.data ? (
        props.children
      ) : (
        <Alert className={cn("w-full", props.customClass)}>
          <AlertTitle>
            {props.customErrorTitle || "Notifikasi Error"}
          </AlertTitle>
          <AlertDescription>
            {props.customErrorMessage ||
              "Data yang dicari tidak ditemukan atau kosong"}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default EmptyState;
