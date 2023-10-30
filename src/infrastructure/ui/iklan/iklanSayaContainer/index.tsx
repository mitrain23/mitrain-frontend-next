import React from "react";
import IklanSayaCard from "../iklanSayaCard";
import { GetPostByAuthorResponse } from "@/src/infrastructure/models/getPostByAuthorResponse";

const IklanSayaContainer = ({
  data,
}: {
  data: GetPostByAuthorResponse | null | undefined;
}) => {
  return (
    <>
      {data?.data.map((item, index) => {
        return (
          <>
            <IklanSayaCard data={item} index={index + 1} />
          </>
        );
      })}
    </>
  );
};

export default IklanSayaContainer;
