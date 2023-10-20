import Navbar from "@/src/components/navbar";
import CreateForm from "@/src/infrastructure/ui/createForm";
import ProtectedRoute from "@/src/utils/auth/protectedRoute";
import LayoutTemplate from "@/src/utils/layout";
import React, { useState } from "react";

const Create = () => {
  return (
    <LayoutTemplate>
      <CreateForm />
    </LayoutTemplate>
  );
};

export default Create;
