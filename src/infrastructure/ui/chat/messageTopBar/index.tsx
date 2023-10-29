import React from "react";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";

const MessageTopBar = () => {
  return (
    <div className="w-full h-[110px] flex flex-row justify-between items-center space-x-2">
      <div className="left flex items-start gap-[24px]">
        <div>
          <Avatar className="md:w-[62px] md:h-[62px]">
            <AvatarImage />
            <AvatarFallback>I</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <h1 className="text-[#020831] font-satoshi md:text-[24px] font-bold break-all">
            Indrawan Firgiawan Siregar
          </h1>
          <p className="font-inter text-[#425379] md:text-[16px] text-sm break-all">
            Last online 7 hours ago
          </p>
        </div>
      </div>

      <div className="right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link" size="icon">
              <DotsVerticalIcon className="w-[24px] h-[24px] fill-[#020831] stroke-[#020831]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <AlertDialog>
                <AlertDialogTrigger className="h-[56px] text-left px-4 py-2">
                  Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Apakah anda yakin ingin menghapus pesan tersebut ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Pesan yang dihapus tidak dapat di kembalikan lagi
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="lg:flex-col-reverse lg:space-x-0 gap-2">
                    <AlertDialogCancel>Batalkan</AlertDialogCancel>
                    <AlertDialogAction>Ya, hapus sekarang</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MessageTopBar;
