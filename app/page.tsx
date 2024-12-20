"use client";
import React, { useState } from "react";
import { Typography, FormControlLabel, Switch } from "@mui/material";
import AgentPage from "./agent/page";
import CustomerPage from "./customer/page";

const HomePage = () => {
  const [isAdminView, setIsAdminView] = useState(false);

  const handleToggle = () => {
    setIsAdminView((prev) => !prev);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center space-x-4">
        <Typography variant="h4" className="mb-6 font-bold">
          Property Lists
        </Typography>
        <FormControlLabel
          control={<Switch checked={isAdminView} onChange={handleToggle} />}
          label={isAdminView ? "Admin View" : "Customer View"}
          labelPlacement="end"
        />
      </div>

      {isAdminView ? <AgentPage /> : <CustomerPage />}
    </div>
  );
};

export default HomePage;
