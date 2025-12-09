"use client";

import * as InstallationService from "@/app/lib/api/installation.api";
import InstallationAdminEmail from "./InstallationAdminEmail";
import InstallationAdminPassword from "./InstallationAdminPassword";
import InstallationGreetings from "./InstallationGreetings";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Installation() {
  const [step, setStep] = useState(0);
  const [adminEmail, setAdminEmail] = useState("");

  const router = useRouter();

  const handleCreateAccount = async (password: string) => {
    let createAccount;
    try {
      createAccount = await InstallationService.completeInstallation({
        adminEmail,
        adminPassword: password,
        instanceName: null,
      });
    } catch (error) {
      toast.error("Error during the creation account.", {
        position: "top-right",
      });
      return;
    }

    if (createAccount?.status !== 201) {
      return;
    }

    toast.success("Successfully created! Redirecting to login page...", {
      position: "top-right",
    });

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-charcoal-sf">
      {step === 0 && <InstallationGreetings onNext={() => setStep(step + 1)} />}
      {step === 1 && (
        <InstallationAdminEmail
          onNext={(email) => {
            setAdminEmail(email);
            setStep(step + 1);
          }}
          onPrev={() => setStep(step - 1)}
        />
      )}
      {step === 2 && (
        <InstallationAdminPassword
          onPrev={() => {
            setStep(step - 1);
          }}
          onSave={handleCreateAccount}
        />
      )}
    </main>
  );
}
