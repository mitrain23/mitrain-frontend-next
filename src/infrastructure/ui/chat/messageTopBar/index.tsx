import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { ChevronLeftIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
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
import { useChatStore } from "@/src/application/zustand/useChatStore";
import { useUser } from "@/src/application/hooks/global/useUser";
import IChatResponse from "@/src/domain/entities/chatResponse";

type TProps = {
  setOpenChat: (value: React.SetStateAction<boolean>) => void;
  selectedChat: IChatResponse | null;
  setSelectedChat: (chat: IChatResponse | null) => void;
};

const MessageTopBar: React.FC<TProps> = ({
  setOpenChat,
  selectedChat,
  setSelectedChat,
}) => {
  const { currentUser } = useUser();

  return (
    <div className="w-full h-[110px] flex flex-row justify-between items-center space-x-2">
      <div className="left flex items-center gap-3">
        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={() => {
            setOpenChat(false);
            setSelectedChat(null);
          }}
        >
          <ChevronLeftIcon />
        </Button>
        <div>
          <Avatar className="md:w-[62px] md:h-[62px]">
            <AvatarImage />
            <AvatarFallback>
              {selectedChat?.users
                .find((userChat) => userChat.id !== currentUser?.id)
                ?.name.toUpperCase()[0] || currentUser?.name.toUpperCase()[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <p className="text-[#020831] font-satoshi md:text-[24px] font-bold break-all line-clamp-1">
            {selectedChat?.product_name || currentUser?.name}
          </p>
          <p className="font-inter text-[#425379] md:text-[16px] text-sm break-all line-clamp-1">
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
