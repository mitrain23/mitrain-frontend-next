"use client";

import EditIcon from "@/public/svg/edit.svg";
import { useDeletePost } from "@/src/application/hooks/posts/useDeletePost";
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
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Datum } from "@/src/infrastructure/models/getPostByAuthorResponse";
import { formatPrice } from "@/src/infrastructure/services/posts/postsRepository";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const IklanSayaCard = ({ data, index }: { data: Datum; index: number }) => {
  const deletePostQuery = useDeletePost(data.id);

  const handleDelete = async (e: any) => {
    e.preventDefault();
    console.log(data.id);
    try {
      deletePostQuery.mutate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-fit border-[1px] border-[#DFDFDF] rounded-[8px] flex flex-col md:flex-row md:items-center justify-between px-[36px] py-[42px]">
      <div className="left flex flex-row gap-[64px]">
        <div className="self-center font-inter text-[#425379]">{index}</div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-0">
          <div className="flex flex-col md:w-[400px]">
            <h1 className="font-satoshi text-[#020831] text-[20px] font-bold truncate w-[200px]">
              {data.title}
            </h1>
            <p className="text-[#6F7277] font-satoshi text-[16px] font-medium capitalize">
              {data.location.toLowerCase()}
            </p>
          </div>
          <div className="md:self-center font-satoshi text-[18px] text-[#020831]">
            <h1>
              Rp {formatPrice(data.priceMin)} - Rp {formatPrice(data.priceMax)}
            </h1>
          </div>
        </div>
      </div>
      <div className="right flex flex-row gap-[20px] max-md:self-end max-md:mt-4">
        <Link href={"/update/" + data.id}>
          <Button
            size="icon"
            variant="link"
            className="edit-button cursor-pointer"
          >
            <EditIcon />
          </Button>
        </Link>

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
                      Apakah anda yakin ingin menghapus iklan tersebut ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Iklan yang dihapus tidak dapat di kembalikan lagi
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="lg:flex-col-reverse lg:space-x-0 gap-2">
                    <AlertDialogCancel>Batalkan</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Ya, hapus sekarang
                    </AlertDialogAction>
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

export default IklanSayaCard;
