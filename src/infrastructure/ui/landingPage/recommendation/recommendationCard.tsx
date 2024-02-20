import React, { useMemo } from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import IAllPostResponse from "@/src/domain/entities/allPostResponse";
import { useMutation, useQueryClient } from "react-query";
import { ChatRepository } from "@/src/infrastructure/services/chat/chatRepository";
import { useToast } from "@/src/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/src/application/zustand/useChatStore";
import { formatPrice } from "@/src/infrastructure/services/posts/postsRepository";

type TProps = {
  data: IAllPostResponse;
};

const API_BASE_URL = process.env.BASE_URL;

const RecommendationCard: React.FC<TProps> = ({ data }) => {
  const { toast } = useToast();
  const { setSelectedChat, chats, setChats } = useChatStore((state) => state);

  const router = useRouter();
  const queryClient = useQueryClient();

  const productImage = useMemo(
    () => `${API_BASE_URL}/images/${data?.images?.[0]?.url}`,
    [data],
  );

  const { mutate: createOrEnterChat, isLoading } = useMutation({
    mutationFn: (userId: string) => {
      return ChatRepository.createOrEnterChat(userId);
    },
  });

  const handleClick = () => {
    createOrEnterChat(data.mitraId, {
      onSuccess: (data) => {
        if (!chats.find((chat) => chat._id === data._id)) {
          setChats([...chats, data]);
        }

        queryClient.invalidateQueries("get_chats");

        setSelectedChat(data);
        router.push("/chat");
      },
      onError: (error) => {
        toast({
          title: "Notifikasi",
          description: "Terjadi kesalahan dalam menghubungi mitra",
        });
      },
    });
  };

  return (
    <div className="font-satoshi flex flex-col w-full">
      <Image
        src={productImage}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-[160px] bg-primary object-cover bg-cover rounded-[12px] mb-[18px]"
      />
      <div className="flex flex-col mt-[18px]">
        <div>
          <h1 className="overflow-hidden text-ellipsis text-[22px] font-bold truncate">
            {data.title}
          </h1>
          <p className="text-[16px] font-inter font-medium text-[#425379]">
            Pengalaman {data.experience}
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-[14px] gap-[18px]">
        <h1 className="overflow-hidden text-ellipsis text-[22px] font-bold truncate">
          Rp {formatPrice(data.priceMin)} - Rp {formatPrice(data.priceMax)}
        </h1>
        <Button
          disabled={isLoading}
          onClick={handleClick}
          variant="outline"
          className="rounded-full h-[48px] hover:bg-[#020831] hover:text-white hover:border-[#020831] text-[16px]"
        >
          {isLoading ? "Menghubungi..." : "Hubungi Mitra"}
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;
